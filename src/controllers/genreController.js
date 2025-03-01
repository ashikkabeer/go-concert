const {createGenreService,
    getGenreService,
    editGenreService,
    deleteGenreService,
    getAllGenreService,
} = require('../services/genreService');

const createGenre = async (req, res) => {
    try {
        const genreData = req.body;
        const result = await createGenreService(genreData);
        res.status(201).json({
            success: true,
            message: 'Genre created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllGenre  = async (req, res) => {
    try {
        const result = await getAllGenreService();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getGenreService(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Genre not found'
            });
        }
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const editGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await editGenreService(id, updateData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Genre not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Genre updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteGenre = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteGenreService(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Genre not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Genre deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createGenre,
    getGenre,
    editGenre,
    getAllGenre,
    deleteGenre,
};
