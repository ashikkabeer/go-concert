const { getUserProfileService, updateUserProfileService } = require('../services/userService')

const getUserProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const userData = await getUserProfileService(token);

        res.status(200).json({ message: 'User profile fetched successfully', userData });
    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, password, role } = req.body;
        if (!name || !password || !role) {
            return res.status(400).json({ message: 'Missing required fields: name, password, role' });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        const updatedProfile = await updateUserProfileService(token, { name, password, role });

        res.status(200).json({ message: 'User profile updated successfully', updatedProfile });
    } catch (error) {
        console.error('Error in updateUserProfile:', error.message);
        res.status(500).json({ message: 'Failed to update user profile', error: error.message });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
}