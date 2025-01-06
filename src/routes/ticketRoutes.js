const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createTicket, getTicket } = require('../controllers/ticketController');
const router = require('express').Router();

router.post('/',roleCheckMiddleware(['customer']), createTicket);
router.get('/:booking_id',roleCheckMiddleware(['customer','organizer','admin']), getTicket);

module.exports = router;
