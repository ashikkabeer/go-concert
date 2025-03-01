const pool = require('../config/db')

const createGenreService = async (genreData, organizerId) => {
    const { name, description } = genreData;
    const query = 'INSERT INTO genres (name, description, organizer_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, description, organizerId];

    const result = await pool.query(query, values);
    return result.rows[0];
};
const getGenreService = async (genreId) => {
    const query = 'SELECT * FROM genres WHERE id = $1';
    const result = await pool.query(query, [genreId]);
    return result.rows[0];
};  

const editGenreService = async (genreId, genreData, organizerId) => {
    const { name, description } = genreData;
    const query = 'UPDATE genres SET name = $1, description = $2 WHERE id = $3 AND organizer_id = $4 RETURNING *';
    const values = [name, description, genreId, organizerId];

    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteGenreService = async (genreId, organizerId) => {
    const query = 'DELETE FROM genres WHERE id = $1 AND organizer_id = $2 RETURNING *';
    const result = await pool.query(query, [genreId, organizerId]);
    return result.rows[0];
};
const getAllGenreService = async () => {
    const query = 'SELECT * FROM genres';
    const result = await pool.query(query);
    return result.rows;
};
module.exports = {
    createGenreService,
    getGenreService,
    editGenreService,
    deleteGenreService,
    getAllGenreService,
};