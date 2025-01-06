const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();
const { createVenue, getVenue, editVenue, deleteVenue } = require('../controllers/venueController');

router.post('/create', createVenue);
router.get('/:venue_id', getVenue);
router.put('/:venue_id/edit', editVenue);
router.delete('/:venue_id/delete', deleteVenue);

module.exports = router;