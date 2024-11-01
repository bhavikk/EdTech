// fraudulentTransaction.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const router = express.Router();


// Initialize OpenAI
const openai = new OpenAI({
    apiKey: 'sk-whsmxkxgCh3qLJ_LLk94ZmWsSbUUuyEDdfB5kRdtU1T3BlbkFJdwxJSt5qUg1LVfXiOaqrPn7Fb47Nq9dxKL7WeJ2hgA'
  });
  

// Multer setup for image uploads
const storage = multer.diskStorage({
                                       destination: function (req, file, cb) {
                                           const uploadPath = path.join(__dirname, 'uploads/fraud');
                                           if (!fs.existsSync(uploadPath)) {
                                               fs.mkdirSync(uploadPath, { recursive: true });
                                           }
                                           cb(null, 'uploads/fraud/');
                                       },
                                       filename: function (req, file, cb) {
                                           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                                           cb(null, uniqueSuffix + '-' + file.originalname);
                                       },
                                   });
const upload = multer({ storage: storage });

// Helper functions to read and write tickets
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

// Function to analyze OCR image using OpenAI
async function analyzeFraudImage(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        const response = await openai.createChatCompletion({
                                                               model: "gpt-4o-mini",
                                                               messages: [
                                                                   {
                                                                       role: "system",
                                                                       content: "You are a fraud analysis agent. Evaluate the OCR image of a credit card transaction and determine if it is fraudulent. Decide whether to: 1. Refund, 2. Decline, or 3. Escalate to Human Agent."
                                                                   },
                                                                   {
                                                                       role: "user",
                                                                       content: `Analyze this OCR image and decide the appropriate action.`,
                                                                   },
                                                                   {
                                                                       role: "user",
                                                                       content: `data:image/jpeg;base64,${imageBase64}`,
                                                                   },
                                                               ],
                                                           });
        const decision = response.data.choices[0].message.content.toLowerCase();
        if (decision.includes('refund')) {
            return 'Refund';
        } else if (decision.includes('decline')) {
            return 'Decline';
        }
        return 'Escalate to Human Agent';
    } catch (error) {
        console.error('Error analyzing fraud image:', error);
        return 'Escalate to Human Agent';
    }
}

// Endpoint to handle fraudulent transaction reports
router.post('/api/fraudulent-tickets', upload.single('image'), async (req, res) => {
    try {
        console.log('Received new fraudulent ticket submission');
        const { description } = req.body;
        const image = req.file;

        if (!description || !image) {
            return res.status(400).json({ message: 'Description and image are required.' });
        }

        const ticketNumber = `FRAUD-${Math.floor(Math.random() * 1000000)}`;
        const decision = await analyzeFraudImage(path.join(__dirname, image.path));

        const newTicket = {
            ticketNumber,
            description,
            imageUrl: `http://localhost:${process.env.PORT || 51105}/uploads/fraud/${image.filename}`,
            decision,
            createdAt: new Date().toISOString()
        };

        const tickets = readTickets();
        tickets.push(newTicket);
        writeTickets(tickets);

        res.status(201).json({ ticketNumber, decision });
    } catch (error) {
        console.error('Error processing fraudulent ticket:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;