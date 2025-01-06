const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();
const { createVenue, getVenue, getAllVenue, editVenue, deleteVenue } = require('../controllers/venueController');

router.post('/', roleCheckMiddleware(['admin', 'organizer']), verifyTokenMiddleware, createVenue);
router.get('/', roleCheckMiddleware(['admin', 'organizer']), verifyTokenMiddleware, getAllVenue);
router.get('/:id', roleCheckMiddleware(['customer', 'admin', 'organizer']), verifyTokenMiddleware, getVenue);
router.put('/:id', roleCheckMiddleware(['admin', 'organizer']), verifyTokenMiddleware, editVenue);
router.delete('/:id', roleCheckMiddleware(['admin', 'organizer']), verifyTokenMiddleware, deleteVenue);

module.exports = router;
