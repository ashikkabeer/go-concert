const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createArtist, getArtist, getAllArtist, editArtist, deleteArtist } = require('../controllers/artistController');
const router = require('express').Router();

router.post('/', createArtist);
router.get('/:id', getArtist);
router.get('/', getAllArtist);
router.put('/:id', editArtist);
router.delete('/:id', deleteArtist);

module.exports = router;
