const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createPayment, getPayment } = require('../controllers/paymentController');
const router = require('express').Router();

router.post('/',roleCheckMiddleware(['customer']), createPayment);
router.get('/:booking_id',roleCheckMiddleware(['customer','organizer','admin']), getPayment);

module.exports = router;
