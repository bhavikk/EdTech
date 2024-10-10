// index.js
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const { getRecommendation } = require('./aiAgent');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve images from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/edtech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all products from MongoDB
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.post('/recommend', async (req, res) => {
  const message = req.body.message;
  const products = await Product.find();
  const recommendation = await getRecommendation(message, products);
  res.json(recommendation);
});

const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Backend server is running on port 5000');
});
