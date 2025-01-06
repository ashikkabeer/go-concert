const router = require('express').Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

router.get('/profile', roleCheckMiddleware(['customer', 'admin', 'organizer']), getUserProfile);
router.put('/profile', roleCheckMiddleware(['customer']), checkProfileOwnershipMiddleware, updateUserProfile);

module.exports = router;
