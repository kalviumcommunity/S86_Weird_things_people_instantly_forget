const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Authentication token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId; // Store user ID in the request
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;