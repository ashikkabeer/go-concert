require('dotenv').config();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwtUtils');
const registerUserService = async (name, email, password, role) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    console.log(saltRounds);
    console.log('register user');
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        name,
        email,
        password: hashPassword,
        role,
    };
    const query = `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`;

    const [results] = await pool.execute(query, [userData.name, userData.email, userData.password, userData.role]);
    const userId = results.insertId;

    const token = signToken(userId, userData.email, userData.role);
    return token;
};
const loginUserService = async (email, password) => {
    console.log('login user');
    console.log(email);

    // [ ] Fetch the user from the users table by email.
    const query = 'SELECT * FROM `Users` WHERE `email` = ?';
    const [results] = await pool.query(query, [email]);
    console.log(results);
    if (!results) {
        throw new Error('User not found');
    }
    console.log(results[0].password);
    const isPasswordMatch = await bcrypt.compare(password, results.password);
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
        throw new Error('Incorrect password');
    }
    const token = signToken(userIresults.idd, userDaa.email, results.role);
    return token;
};
module.exports = {
    registerUserService,
    loginUserService,
};
