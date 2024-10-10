const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find().populate('reviews');
  res.json(products);
});

// Add a review to a product
router.post('/:productId/review', async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.productId;
  const userId = req.userId; // You should have this in req after verifying JWT

  const review = new Review({ product: productId, user: userId, rating, comment });
  await review.save();

  const product = await Product.findById(productId);
  product.reviews.push(review);
  await product.save();

  res.status(201).json(review);
});

module.exports = router;
