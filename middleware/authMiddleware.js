const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // This will get the token part after "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data (id) to the request
    next(); // Continue to the next middleware/handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
