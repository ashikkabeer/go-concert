require('dotenv').config();
var jwt = require('jsonwebtoken');
const router = require('express').Router();
const pool = require('../config/db')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET;
router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, role } = req.body;
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

        const hashPassword = await bcrypt.hash(password, saltRounds);

        const userData = {
            name,
            email,
            password: hashPassword,
            role
        };
        const query = `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`;

        console.log('Query about to execute');

        const [results, fields] = await pool.execute(query, [userData.name, userData.email, userData.password, userData.role]);
        const userId = results.insertId;

        const token = jwt.sign(
            { id: userId, email: userData.email, role: userData.role },
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return res.status(200).json({ "token": token, "message": "Successfull" });

    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json('Error inserting user');

    }
})

module.exports = router;