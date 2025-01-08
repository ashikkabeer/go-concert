const { roleCheckMiddleware } = require('../middlewares/authMiddleware');
const { createArtist, getArtist, getAllArtist, editArtist, deleteArtist, searchArtist } = require('../controllers/artistController');
const router = require('express').Router();

router.post('/',roleCheckMiddleware(['admins','organizer']), createArtist);
router.get('/', getAllArtist);
router.get('/search',searchArtist)
router.get('/:id', getArtist);
router.put('/:id',roleCheckMiddleware(['admins','organizer']), editArtist);
router.delete('/:id',roleCheckMiddleware(['admins','organizer']), deleteArtist);

module.exports = router;
