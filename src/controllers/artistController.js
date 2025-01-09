const {
    createArtistService,
    getAllArtistService,
    getArtistService,
    editArtistService,
    deleteArtistService,
    searchArtistService,
} = require('../services/artistService');
const createArtist = async (req, res) => {
    // created_by from the req.user.id
    const { bio, genre, image_url, name } = req.body;
    const created_by = req.user.id;
    console.log(bio, genre, image_url, created_by);
    try {
        const artist_id = await createArtistService(bio, genre, image_url, created_by, name);

        return res.status(200).json({
            artist_id: artist_id,
            message: 'Successfull',
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getArtist = async (req, res) => {
    // get artist by id
    const id = req.params.id;
    try {
        const artist = await getArtistService(id);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const searchArtist = async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const artist = await searchArtistService(keyword);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getAllArtist = async (req, res) => {
    try {
        const artist = await getAllArtistService();
        return res.status(200).json({
            message: 'Successfull',
            artist,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const editArtist = async (req, res) => {
    // edit only if its from created_by
    const id = req.params.id;
    try {
        const artist = await editArtistService(id);
        return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteArtist = async (req, res) => {
    // can delete only if the organizer created it
    const id = req.params.id;
    try {
        const result = await deleteArtistService(id);
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
