const { registerUserService, loginUserService } = require('../services/authService')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const token = await registerUserService(name, email, password, role);

        return res.status(200).json({ "token": token, "message": "Successfull" });

    } catch (error) {
        return res.status(500).json(error.message);

    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUserService(email, password);
        return res.status(200).json({ "token": token, "message": "Successfull" });

    } catch (error) {
        if (error.message === 'User not found') {
            res.status(401).json({ error: "User not found. Check email id or create a new account" })
        } else if (error.message === 'Incorrect password') {
            res.status(401).json({ error: 'Incorrect password. Please try again.' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }

    }
}
const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'logged out.' });
}
const forgotPassword = async (req, res) => {
    res.status(200).json({ message: 'forgot password.' });
}
const resetPassword = async (req, res) => {
    res.status(200).json({ message: 'reset password.' });
}


const getUserProfile = async (req, res) => {
    // [ ] Extract the user ID from the JWT token.
    // [ ] Fetch the user's details from the users table.
    // [ ] Return the user's profile data.
}
const updateUserProfile = async (req, res) => {
    // [ ] Validate input fields (name, email, password, etc.).
    // [ ] Allow updating specific fields (e.g., name, email, password).
    // [ ] Hash the new password if updated.
    // [ ] Update the user's details in the users table.
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateUserProfile
}