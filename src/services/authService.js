
require('dotenv').config();
const pool = require('../config/db')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


const registerUserService = async (name, email, password, role) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
        name,
        email,
        password: hashPassword,
        role
    };
    const query = `INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`;

    const [results] = await pool.execute(query, [userData.name, userData.email, userData.password, userData.role]);
    const userId = results.insertId;

    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
        { id: userId, email: userData.email, role: userData.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}
const loginUserService = async (email, password) => {
    console.log('login user')
    console.log(email)
    // [ ] Fetch the user from the users table by email.
    const query = 'SELECT * FROM `Users` WHERE `email` = ?';
    // 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    const [results] = await pool.query(query, [email])
    console.log(results)
    if (!results) {
        throw new Error('User not found');
    }
    console.log(results[0].password)
    const isPasswordMatch = await bcrypt.compare(password, results.password);
    console.log(isPasswordMatch)

    if (!isPasswordMatch) {
        throw new Error('Incorrect password');
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
        { id: results.id, email: email, role: results.role },
        JWT_SECRET,
        { expiresIn: '1h' }

    );
    console.log(token);
    return token;
}
module.exports = {
    registerUserService,
    loginUserService
}