const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createBooking, viewBooking, deleteBooking, viewAllBookings, cancelBooking } = require('../controllers/bookingController');
const router = require('express').Router();

router.post('/', roleCheckMiddleware(['customer']), createBooking); // ? create a booking // send concert_id by body
router.get('/', roleCheckMiddleware(['customer']), verifyTokenMiddleware, checkProfileOwnershipMiddleware, viewAllBookings); // view all the past bookings.
router.get('/:id', roleCheckMiddleware(['customer', 'organizer', 'admin']), verifyTokenMiddleware, checkProfileOwnershipMiddleware, viewBooking); // view the booking.
router.put('/:id', roleCheckMiddleware(['customer', 'organizer', 'admin']), verifyTokenMiddleware, checkProfileOwnershipMiddleware, cancelBooking); // view the booking.

router.delete(
    '/:id/',
    roleCheckMiddleware(['customer', 'organizer', 'admin']),
    verifyTokenMiddleware,
    checkProfileOwnershipMiddleware,
    deleteBooking
); // organizer update booking status

module.exports = router;
