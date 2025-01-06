const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const { createGenre, getGenre, editGenre, deleteGenre } = require('../controllers/genreController');
const router = require('express').Router();

router.post('/', createGenre);
router.get('/:id', getGenre);
router.put('/:id', editGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
