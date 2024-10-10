// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

// Place an order
router.post('/place', verifyToken, async (req, res) => {
  const { products, shippingAddress, billingAddress, paymentDetails, totalAmount } = req.body;
  
  const orderNumber = 'ORD' + Math.floor(Math.random() * 1000000); // Generate order number

  const newOrder = new Order({
    user: req.userId,
    products,
    shippingAddress,
    billingAddress,
    paymentDetails,
    totalAmount,
    orderNumber,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to place the order' });
  }
});

// Get all orders for the authenticated user
router.get('/user-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('products.product');
    res.json(orders || []); // Always return an empty array if no orders exist
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
module.exports = router;
