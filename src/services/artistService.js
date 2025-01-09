const pool = require('../config/db');
const createArtistService = async (bio, genre, image_url, created_by, name) => {
    const createArtistQuery = `INSERT INTO Artists(bio,genre,image_url,created_by,name) VALUES (?,?,?,?,?)`;
    console.log(bio, genre, image_url, created_by);
    console.log('pool');
    const [row] = await pool.execute(createArtistQuery, [bio, genre, image_url, created_by, name]);
    console.log(row);
    return row.insertId;
};

const searchArtistService = async (keyword) => {
    const query = 'SELECT * FROM artists WHERE name LIKE ?';
    const [results] = await pool.execute(query, [`%${keyword}%`]);
    return results;
};

const getArtistService = async (id) => {
    const query = 'SELECT * FROM Artists WHERE id = ?';
    const [artist] = await pool.query(query, [id]);
    return artist;
};
const getAllArtistService = async () => {
    const query = 'SELECT * FROM Artists ORDER BY name';

    // Fetch artists for the current page
    const [artists] = await pool.execute(query);

    return artists; // Return all fetched artists
};

const editArtistService = async (id) => {
    // edit only if its from created_by
    const query = 'SELECT * FROM Artists WHERE id = ?';
    let startIndex = 0; // Initialize start index
    let results = [];

    const [artist] = await pool.execute(query, [id]);
    const bio = artist[0].bio;
    const genre = artist[0].genre;
    // now edit the artist
    // from the image, generate the image url
    // const imageUrl = uploadImageToCloud(image)
    const image_url = 'imageUrl';
    const editQuery = 'UPDATE TABLE SET bio = ?, genre = genre, image_url=?';
    const [newArtist] = await pool.execute(editQuery, [bio, genre, image_url]);
    return newArtist[0];

    // can edit only if the organizer created it
};

const deleteArtistService = async (id) => {
    // can delete only if the organizer created it
    const query = 'DELETE FROM Artists WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
};

module.exports = {
    createArtistService,
    searchArtistService,
    getArtistService,
    editArtistService,
    deleteArtistService,
    getAllArtistService,
};
