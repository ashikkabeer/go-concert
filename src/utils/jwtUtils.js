require('dotenv').config();
var jwt = require('jsonwebtoken');

const signToken = (id, email, role) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            id: id,
            email: email,
            role: role,
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

const verifyToken = (token) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.verify(token, JWT_SECRET);
};
module.exports = { signToken, verifyToken };
