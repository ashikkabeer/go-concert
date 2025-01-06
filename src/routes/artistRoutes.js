const { roleCheckMiddleware, verifyTokenMiddleware, checkProfileOwnershipMiddleware } = require('../middlewares/authMiddleware');
const {createArtist, getArtist, editArtist, deleteArtist} = require('../controllers/artistController')
const router = require('express').Router();


router.post('/create',createArtist);
router.get('/:artist_id',getArtist);
router.put('/:artist_id/edit',editArtist);
router.delete('/:artist_id/delete',deleteArtist);

module.exports = router;
