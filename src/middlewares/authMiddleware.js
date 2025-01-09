require('dotenv').config();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwtUtils');
// Middleware to check if the user has the required role
const roleCheckMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Access token is missing',
                });
            }

            const decoded = verifyToken(token);

            // Check if the user's role is in the allowedRoles array
            const userRole = decoded.role;
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    message: 'Access forbidden: Insufficient permissions',
                });
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error in roleCheckMiddleware:', error.message);
            return res.status(401).json({
                message: 'Invalid or expired token',
            });
        }
    };
};

// Middleware to verify the token and add user data to the request
const verifyTokenMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization header missing',
        });
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({
            message: 'Token missing',
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Invalid or expired token',
        });
    }
};

// Middleware to check if the logged-in user owns the profile
const checkProfileOwnershipMiddleware = (req, res, next) => {
    const userIdFromToken = req.user.id;
    const userIdFromRequest = req.params.id || req.body.id;

    if (userIdFromToken !== userIdFromRequest) {
        return res.status(403).json({
            message: 'You are not authorized to access this profile',
        });
    }

    next();
};

module.exports = {
    verifyTokenMiddleware,
    roleCheckMiddleware,
    checkProfileOwnershipMiddleware,
};
