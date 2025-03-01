const { createVenueService, getAllVenueService, getVenueService, editVenueService, deleteVenueService } = require('../services/venueService');

const createVenue = async (req, res) => {
    try {
        const venueData = req.body;
        const organizerId = req.user.id;
        const venue = await createVenueService(venueData, organizerId);
        
        return res.status(201).json({
            message: 'Venue created successfully',
            venue
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create venue',
            error: error.message
        });
    }
};

const getVenue = async (req, res) => {
    try {
        const venueId = req.params.id;
        const venue = await getVenueService(venueId);
        
        if (!venue) {
            return res.status(404).json({
                message: 'Venue not found'
            });
        }

        return res.status(200).json(venue);
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch venue',
            error: error.message
        });
    }
};

const editVenue = async (req, res) => {
    try {
        const venueId = req.params.id;
        const venueData = req.body;
        const organizerId = req.user.id;
        
        const venue = await editVenueService(venueId, venueData, organizerId);
        
        return res.status(200).json({
            message: 'Venue updated successfully',
            venue
        });
    } catch (error) {
        if (error.message === 'Unauthorized to edit this venue') {
            return res.status(403).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: 'Failed to update venue',
            error: error.message
        });
    }
};

const deleteVenue = async (req, res) => {
    try {
        const venueId = req.params.id;
        const organizerId = req.user.id;
        
        const venue = await deleteVenueService(venueId, organizerId);
        
        return res.status(200).json({
            message: 'Venue deleted successfully',
            venue
        });
    } catch (error) {
        if (error.message === 'Unauthorized to delete this venue') {
            return res.status(403).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: 'Failed to delete venue',
            error: error.message
        });
    }
};

const getAllVenue = async (req, res) => {
    try {
        const venues = await getAllVenueService();
        return res.status(200).json({
            message: 'Venues fetched successfully',
            venues
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch venues',
            error: error.message
        });
    }
};

module.exports = {
    createVenue,
    getAllVenue,
    getVenue,
    editVenue,
    deleteVenue,
};