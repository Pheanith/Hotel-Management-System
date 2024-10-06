// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded; // Store user information from token
    next(); // Proceed to the next middleware or route handler
  });
};
