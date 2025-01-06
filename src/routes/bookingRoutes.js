const {
  roleCheckMiddleware,
  verifyTokenMiddleware,
  checkProfileOwnershipMiddleware,
} = require("../middlewares/authMiddleware");
const {
  createBooking,
  viewBooking,
  deleteBooking,
  viewAllBookings
} = require("../controllers/bookingController");
const router = require("express").Router();

router.post("/", createBooking); // ? create a booking // send concert_id by body
router.get("/", verifyTokenMiddleware,checkProfileOwnershipMiddleware, viewAllBookings) // view all the past bookings.
router.get("/:id",verifyTokenMiddleware, checkProfileOwnershipMiddleware, viewBooking) // view the booking.
router.put('/:id/status',verifyTokenMiddleware, checkProfileOwnershipMiddleware, deleteBooking) // organizer update booking status
router.delete('/:id/',verifyTokenMiddleware, checkProfileOwnershipMiddleware, deleteBooking) // organizer update booking status


module.exports = router;