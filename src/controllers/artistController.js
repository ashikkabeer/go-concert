const {
    createArtistService,
    getAllArtistService,
    getArtistService,
    editArtistService,
    deleteArtistService,
    searchArtistService,
} = require('../services/artistService');
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
    const id = req.params.id;
    try {
        const artist = getArtistService(id);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const searchArtist = (req, res) => {
    const keyword = req.query.keyword;
    try {
        const artist = searchArtistService(keyword);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getAllArtist = (req, res) => {
    // get all artist
    const page_limit = 20;
    const start_index = 0;
    try {
        const artist = getAllArtistService(page_limit, start_index);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const editArtist = (req, res) => {
    // edit only if its from created_by
    const id = req.params.id;
    try {
        const artist = editArtistService(id);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteArtist = (req, res) => {
    // can delete only if the organizer created it
    const id = req.params.id;
    try {
        const result = deleteArtistService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    createArtist,
    getArtist,
    editArtist,
    deleteArtist,
    getAllArtist,
    searchArtist,
};
