const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 51105;

// OpenAI Configuration with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-whsmxkxgCh3qLJ_LLk94ZmWsSbUUuyEDdfB5kRdtU1T3BlbkFJdwxJSt5qUg1LVfXiOaqrPn7Fb47Nq9dxKL7WeJ2hgA'
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Helper functions
const readTickets = () => {
    const pathToTickets = path.join(__dirname, 'tickets.json');
    if (!fs.existsSync(pathToTickets)) {
        fs.writeFileSync(pathToTickets, JSON.stringify([]));
    }
    const data = fs.readFileSync(pathToTickets, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error('Error parsing tickets.json:', error);
        return [];
    }
};

const writeTickets = (tickets) => {
    try {
        fs.writeFileSync(path.join(__dirname, 'tickets.json'), JSON.stringify(tickets, null, 2));
    } catch (error) {
        console.error('Error writing to tickets.json:', error);
    }
};

// Function to analyze image using OpenAI
async function analyzeDeliveryImage(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');

        const response = await openai.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                {
                    role: "system",
                    content: "You are a package delivery analyst. Evaluate the delivery image and determine if the package qualifies for: 1. Refund Order, 2. Replace Order, or 3. Escalate to Human Agent."
                },
                {
                    role: "user",
                    content: "Analyze this delivery image and decide the appropriate action."
                },
                {
                    role: "user",
                    content: `data:image/jpeg;base64,${imageBase64}`
                }
            ]
        });

        // Check if response contains choices and a message
        const decision = response?.choices?.[0]?.message?.content?.toLowerCase();
        if (!decision) {
            throw new Error('OpenAI API did not return a valid decision.');
        }

        if (decision.includes('refund')) {
            return 'Refund Order';
        } else if (decision.includes('replace')) {
            return 'Replace Order';
        }
        return 'Escalate to Human Agent';
    } catch (error) {
        console.error('Error analyzing image:', error);
        return 'Escalate to Human Agent';
    }
}

// Endpoints
app.post('/api/tickets', upload.single('image'), async (req, res) => {
    try {
        console.log('Received new ticket submission');
        const { description } = req.body;
        const image = req.file;

        if (!description || !image) {
            return res.status(400).json({ message: 'Description and image are required.' });
        }

        const ticketNumber = `TICKET-${Math.floor(Math.random() * 1000000)}`;
        const decision = await analyzeDeliveryImage(path.join(__dirname, image.path));

        const newTicket = {
            ticketNumber,
            description,
            imageUrl: `http://localhost:${PORT}/uploads/${image.filename}`,
            decision,
            createdAt: new Date().toISOString()
        };

        const tickets = readTickets();
        tickets.push(newTicket);
        writeTickets(tickets);

        res.status(201).json({ ticketNumber, decision });

    } catch (error) {
        console.error('Error processing ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/tickets', (req, res) => {
    try {
        const tickets = readTickets();
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/tickets/:ticketNumber', (req, res) => {
    try {
        const { ticketNumber } = req.params;
        const tickets = readTickets();
        const ticket = tickets.find(t => t.ticketNumber === ticketNumber);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found.' });
        }

        res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Import the fraudulent transaction routes
const fraudulentTransactionRoutes = require('./fraudulentTransaction');
app.use(fraudulentTransactionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
