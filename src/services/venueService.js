const pool = require('../config/db')

const createVenueService = async (venueData, organizerId) => {
    const { name, location, capacity, description } = venueData;
    const query = 'INSERT INTO venues (name, location, capacity, description, organizer_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [name, location, capacity, description, organizerId];
    
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getVenueService = async (venueId) => {
    const query = 'SELECT * FROM venues WHERE id = $1';
    const result = await pool.query(query, [venueId]);
    return result.rows[0];
};

const editVenueService = async (venueId, venueData, organizerId) => {
    const { name, location, capacity, description } = venueData;
    
    // First check if the venue belongs to the organizer
    const checkQuery = 'SELECT * FROM venues WHERE id = $1 AND organizer_id = $2';
    const checkResult = await pool.query(checkQuery, [venueId, organizerId]);
    
    if (checkResult.rows.length === 0) {
        throw new Error('Unauthorized to edit this venue');
    }
    
    const query = 'UPDATE venues SET name = $1, location = $2, capacity = $3, description = $4 WHERE id = $5 RETURNING *';
    const values = [name, location, capacity, description, venueId];
    
    const result = await pool.query(query, values);
    return result.rows[0];
};

const deleteVenueService = async (venueId, organizerId) => {
    // First check if the venue belongs to the organizer
    const checkQuery = 'SELECT * FROM venues WHERE id = $1 AND organizer_id = $2';
    const checkResult = await pool.query(checkQuery, [venueId, organizerId]);
    
    if (checkResult.rows.length === 0) {
        throw new Error('Unauthorized to delete this venue');
    }
    
    const query = 'DELETE FROM venues WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [venueId]);
    return result.rows[0];
};

const getAllVenueService = async () => {
    const query = 'SELECT * FROM venues';
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    createVenueService,
    getAllVenueService,
    getVenueService,
    editVenueService,
    deleteVenueService,
};
