const router = require('express').Router();
const { registerUser, loginUser,logoutUser,forgotPassword,resetPassword } = require('../controllers/userController')
const {getUserProfile,updateUserProfile} = require('../controllers/userController')
//auth routes

// const { protect, restrictTo } = require('../middlewares/authMiddleware');
router.get('/profile',protect, getUserProfile);
router.put('/profile',protect, updateUserProfile)


router.post('/logout', logoutUser)
router.post('/forgot-password', logoutUser)
router.post('/reset-password', logoutUser)

// 


// [ ] Create an endpoint: PUT /api/users/profile
// [ ] Validate input fields (name, email, password, etc.).
// [ ] Allow updating specific fields (e.g., name, email, password).
// [ ] Hash the new password if updated.
// [ ] Update the user's details in the users table.
module.exports = router;