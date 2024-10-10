// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET =  process.env.JWT_SECRET; // Use a secure secret key in production

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('A token is required for authentication');

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.userId = decoded.userId; // Store userId from token in request object
  } catch (err) {
    return res.status(401).send('Invalid token');
  }

  return next();
}

module.exports = verifyToken;
