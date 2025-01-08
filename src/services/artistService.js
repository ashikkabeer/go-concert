const pool = require('../config/db');
const createArtistService = (bio, genre, image_url, created_by) => {
    const createArtistQuery = `INSERT INTO Artists('bio','genre','image_url','created_by') VALUES (?,?,?,?)`;
    const [row] = pool.execute(createArtistQuery, [bio, genre, image_url, created_by]);
    return row[0].insertedId;
};

const searchArtistService = (keyword) => {
    const query = 'SELECT * FROM artists WHERE name LIKE ?';
    const [results] = pool.execute(query, [`%${keyword}%`]);
    return results;
};

const getArtistService = (id) => {
    const id = req.params.id;
    const query = 'SELECT * FROM Artists WHERE id = ?';
    const [artist] = pool.query(query, [id]);
    return artist[0];
};
const getAllArtistService = (req, res) => {
    const query = 'SELECT * FROM Artists ORDER BY ? LIMIT PAGE ? OFFSET ?'; //COLUMN NAME // PAGE_SIZE // START_INDEX
    // write code to chnage start index after the other
    const [artist] = pool.execute(query, [id, 20, 0]);
    return artist;
};

const editArtistService = (id) => {
    // edit only if its from created_by
    const query = 'SELECT * FROM Artists WHERE id = ?';
    const [artist] = pool.execute(query, [id]);
    const bio = artist[0].bio;
    const genre = artist[0].genre;
    // now edit the artist
    // from the image, generate the image url
    // const imageUrl = uploadImageToCloud(image)
    const image_url = 'imageUrl';
    const editQuery = 'UPDATE TABLE SET bio = ?, genre = genre, image_url=?';
    const [newArtist] = pool.execute(editQuery, [bio, genre, image_url]);
    return newArtist[0];

    // can edit only if the organizer created it
};

const deleteArtistService = (req, res) => {
    // can delete only if the organizer created it
    const query = 'DELETE FROM Artists WHERE id = ?';
    const [result] = pool.execute(query, [id]);
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
