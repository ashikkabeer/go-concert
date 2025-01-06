const { roleCheckMiddleware } = require('../middlewares/authMiddleware');
const { createArtist, getArtist, getAllArtist, editArtist, deleteArtist } = require('../controllers/artistController');
const router = require('express').Router();

router.post('/',roleCheckMiddleware(['admins','organizer']), createArtist);
router.get('/:id', getArtist);
router.get('/', getAllArtist);
router.put('/:id',roleCheckMiddleware(['admins','organizer']), editArtist);
router.delete('/:id',roleCheckMiddleware(['admins','organizer']), deleteArtist);

module.exports = router;
