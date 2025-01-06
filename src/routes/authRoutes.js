const router = require('express').Router();
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/authController');
const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
//auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyTokenMiddleware, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', checkProfileOwnershipMiddleware, resetPassword);

module.exports = router;
