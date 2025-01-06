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

router.post("/:service_id", createBooking); // create a booking
router.get("/", verifyTokenMiddleware,checkProfileOwnershipMiddleware, viewAllBookings) // view all the past bookings.
router.get("/",verifyTokenMiddleware, checkProfileOwnershipMiddleware, viewBooking) // view the booking done.
router.put('/',verifyTokenMiddleware, checkProfileOwnershipMiddleware, deleteBooking) // soft delete bookings


module.exports = router;