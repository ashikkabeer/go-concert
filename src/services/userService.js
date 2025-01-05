const { pool } = require('../config/db');
const bcrypt = require('bcrypt');

require('dotenv').config();

const getUserProfileService = async (token) => {
    const secretKey = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secretKey); // No await needed
    console.log(decoded);

    const email = decoded.email || decoded.user?.email;

    if (!email) {
        throw new Error('Email not found in token');
    }

    const query = 'SELECT * FROM Users WHERE email = ?';
    const [results] = await pool.query(query, [email]);

    if (results.length === 0) {
        throw new Error('User not found');
    }

    return results[0]; // Return the user's profile
};

const updateUserProfileService = async (token, updates) => {
    // [ ] Validate input fields (name, email, password, etc.).
    // [ ] Allow updating specific fields (e.g., name, email, password).
    // [ ] Hash the new password if updated.
    // [ ] Update the user's details in the users table.
    const secretKey = process.env.JWT_SECRET;
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

    const decoded = jwt.verify(token, secretKey); // No await needed
    console.log(decoded);

    const email = decoded.email || decoded.user?.email;

    if (!email) {
        throw new Error('Email not found in token');
    }

    const selectQuery = 'SELECT * FROM Users WHERE email = ?';
    const [profile] = await pool.query(selectQuery, [email]);

    if (profile.length === 0) {
        throw new Error('User not found');
    }

    const { name, password, role } = updates; // Assume updates are passed as an object
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const updateQuery =
        'UPDATE Users SET name = ?, password = ?, role = ? WHERE email = ?';
    const [updateResult] = await pool.query(updateQuery, [
        name,
        hashPassword,
        role,
        email,
    ]);

    if (updateResult.affectedRows === 0) {
        throw new Error('Failed to update user profile');
    }

    const [updatedProfile] = await pool.query(selectQuery, [email]);

    return updatedProfile[0]; // Return the updated user's profile
};

module.exports = {
    getUserProfileService,
    updateUserProfileService,
};
