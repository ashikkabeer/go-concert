const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();
const { createVenue, getVenue, getAllVenue, editVenue, deleteVenue } = require('../controllers/venueController');

router.post('/', createVenue);
router.get('/', getAllVenue);
router.get('/:id', getVenue);

router.put('/:id', editVenue);
router.delete('/:id', deleteVenue);

module.exports = router;
