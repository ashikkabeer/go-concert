const { createArtistService, getAllArtistService, getArtistService, editArtistService, deleteArtistService, searchArtistService } = require('../services/artistService');
const createArtist = (req, res) => {
    // created_by from the req.user.id
    const { bio, genre, image_url } = req.body;
    const created_by = req.user.id;
    try {
        const artist_id = createArtistService(bio, genre, image_url, created_by);

        return res.status(200).json({
            artist_id: artist_id,
            message: 'Successfull',
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getArtist = (req, res) => {
    // get artist by id

    
    //anybody
};
const searchArtist = (req,res) => {
    const sql = 'SELECT id, name, image_url FROM artists WHERE name LIKE ?';

}
const getAllArtist = (req, res) => {
    //anybody
};

const editArtist = (req, res) => {
    // can edit only if the organizer created it
};

const deleteArtist = (req, res) => {
    // can delete only if the organizer created it
};

module.exports = {
    createArtist,
    getArtist,
    editArtist,
    deleteArtist,
    getAllArtist,
    searchArtist
};
