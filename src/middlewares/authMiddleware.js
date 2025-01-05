const jwt = require('jsonwebtoken');

const roleCheckMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
      }

      // Verify the token
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey);

      // Check if the user's role is in the allowedRoles array
      const userRole = decoded.role; // Assuming the role is included in the token payload
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
      }

      // Pass control to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error in roleCheckMiddleware:', error.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = roleCheckMiddleware;
