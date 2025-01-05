const {
    registerUserService,
    loginUserService,
} = require('../services/authService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const token = await registerUserService(name, email, password, role);

        return res.status(200).json({
            token: token,
            message: 'Successfull',
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUserService(email, password);
        return res.status(200).json({
            token: token,
            message: 'Successfull',
        });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(401).json({
                error: 'User not found. Check email id or create a new account',
            });
        } else if (error.message === 'Incorrect password') {
            res.status(401).json({
                error: 'Incorrect password. Please try again.',
            });
        } else {
            res.status(500).json({
                error: 'An unexpected error occurred.',
            });
        }
    }
};
const logoutUser = async (req, res) => {
    //     Implement token blacklisting or client-side token removal.
    //      Return a success message.

    res.status(200).json({ message: 'logged out.' });
};

const forgotPassword = async (req, res) => {
    // Use JWT or a secure random string for reset tokens.
    // [ ] Save the reset token and expiry time in the users table or a separate password_resets table.
    // [ ] Validate the token before allowing the password reset.

    res.status(200).json({ message: 'forgot password.' });
};
const resetPassword = async (req, res) => {
    // Use JWT or a secure random string for reset tokens.
    // [ ] Save the reset token and expiry time in the users table or a separate password_resets table.
    // [ ] Validate the token before allowing the password reset.

    res.status(200).json({ message: 'reset password.' });
};
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
};
