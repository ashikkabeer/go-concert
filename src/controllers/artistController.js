const {createArtistService,getAllArtistService,getArtistService,editArtistService,deleteArtistService} = require('../services/artistService')
const createArtist = (req,res) => {
    // created_by from the req.user.id
    const {bio, genre, image_url,} = req.body
    const created_by = req.user.id
    const artist_id = createArtistService(bio, genre, image_url, created_by)
    
}

const getArtist = (req,res) => {
    //anybody
}
const getAllArtist = (req,res) => {
    //anybody
}

const editArtist = (req,res) => {
    // can edit only if the organizer created it
}

const deleteArtist = (req,res) => {
    // can delete only if the organizer created it
}

module.exports = {
    createArtist, getArtist, editArtist, deleteArtist,getAllArtist
}
