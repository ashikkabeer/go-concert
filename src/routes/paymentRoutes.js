const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createPayment, getPayment } = require('../controllers/paymentController');
const router = require('express').Router();

router.post('/', createPayment);
router.get('/:booking_id', getPayment);

module.exports = router;
