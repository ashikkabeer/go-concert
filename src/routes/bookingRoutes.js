const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const {
    createBookingService,
    viewBookingService,
    deleteBookingService,
    viewAllBookingService,
    cancelBooking,
} = require('../controllers/bookingController');
const router = require('express').Router();

router.post('/', roleCheckMiddleware(['customer']), createBookingService); // ? create a booking // send concert_id by body
router.get('/', roleCheckMiddleware(['customer']), verifyTokenMiddleware, checkProfileOwnershipMiddleware, viewAllBookingService); // view all the past bookings.
router.get(
    '/:id',
    roleCheckMiddleware(['customer', 'organizer', 'admin']),
    verifyTokenMiddleware,
    checkProfileOwnershipMiddleware,
    viewBookingService
); // view the booking.
router.put('/:id', roleCheckMiddleware(['customer', 'organizer', 'admin']), verifyTokenMiddleware, checkProfileOwnershipMiddleware, cancelBooking); // view the booking.

router.delete(
    '/:id/',
    roleCheckMiddleware(['customer', 'organizer', 'admin']),
    verifyTokenMiddleware,
    checkProfileOwnershipMiddleware,
    deleteBookingService
); // organizer update booking status

module.exports = router;
