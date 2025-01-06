const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();


// bookings
router.get('/event/:event_id/bookings')
router.put('/event/:event_id/bookings/:booking_id')

module.exports = router;
