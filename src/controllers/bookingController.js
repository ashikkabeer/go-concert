const pool = require('../config/db');
import { createBookingService, cancelBookingService } from '../services/bookingService';
const createBooking = (req, res) => {
    const ticket_id = req.body.ticket_id;
    const user_id = req.user.id;
    const booking = createBookingService(ticket_id, user_id);
    res.status(201).json({
        message: 'Booking created successfully',
        booking,
    });
};

const viewBooking = (req, res) => {
    const id = req.params.id;
    const booking = viewBookingService(id);
    res.status(200).json({
        message: 'Booking created successfully',
        booking,
    });
};

const viewAllBookings = (req, res) => {
    const bookings = viewAllBookingsService(req.user.id);
    res.status(200).json({
        message: 'All bookings fetched successfully',
        bookings,
    });
};

const deleteBooking = (req, res) => {
    const id = req.params.id;
    const booking = deleteBookingService(id);
    res.status(200).json({
        message: 'Booking deleted successfully',
        booking,
    });
};
const cancelBooking = (req, res) => {
    // update the booking_status to 'cancelled'
    const id = req.params.id;
    const booking_status = 'cancelled';
    const booking = cancelBookingService(id, booking_status);
    res.status(200).json({
        message: 'Booking cancelled successfully',
        booking,
    });
};

module.exports = {
    createBooking,
    viewBooking,
    deleteBooking,
    viewAllBookings,
    cancelBooking,
};
