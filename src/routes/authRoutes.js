const router = require('express').Router();
const { registerUser, loginUser,logoutUser,forgotPassword,resetPassword } = require('../controllers/userController')

//auth routes
router.post('/register', registerUser);
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/forgot-password', logoutUser)
router.post('/reset-password', logoutUser)

// 



module.exports = router;