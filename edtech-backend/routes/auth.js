// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;  // Use environment variables in production

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(409).send('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  
  await user.save();
  res.status(201).send('User created');
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).send('Invalid credentials');

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
