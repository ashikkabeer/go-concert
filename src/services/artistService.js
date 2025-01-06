const pool = require('../config/db')
const createArtistService = (bio, genre, image_url, created_by) => {
    const createArtistQuery = `INSERT INTO Artists('bio','genre','image_url','created_by') VALUES (?,?,?,?)`
    const [row] = pool.execute(createArtistQuery, [bio, genre, image_url, created_by])
    return row[0].insertedId;
}

const getArtistService = (req,res) => {
    //anybody
}
const getAllArtistService = (req,res) => {
    //anybody
}

const editArtistService = (req,res) => {
    // can edit only if the organizer created it
}

const deleteArtistService = (req,res) => {
    // can delete only if the organizer created it
}

module.exports = {
    createArtistService, getArtistService, editArtistService, deleteArtistService,getAllArtistService
}
