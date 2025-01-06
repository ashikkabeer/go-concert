const router = require('express').Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
