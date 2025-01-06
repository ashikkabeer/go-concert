const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createTicket, getTicket } = require('../controllers/ticketController');
const router = require('express').Router();

router.post('/', createTicket);
router.get('/:booking_id', getTicket);

module.exports = router;
