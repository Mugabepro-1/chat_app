const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is in models/User.js

const JWT_SECRET = process.env.JWT_SECRET ;

const AuthMiddleware = {
  authenticateToken(req, res, next) {
    // Skip authentication for specific routes
    const unprotectedRoutes = ['/user/register', '/user/login'];
    
    if (unprotectedRoutes.includes(req.path)) {
      return next(); // Skip authentication
    }
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  }
};

module.exports = AuthMiddleware;
