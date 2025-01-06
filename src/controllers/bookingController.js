const pool = require('../config/db')

const createBooking = (req, res) => {
    const service_id = req.params.service_id;
    const user_id = req.user.id;
    
    // get the user data by the id.
    const getUserQuery = `SELECT * FROM Users WHERE id = ?`;
    const [userData] = pool.query(getUserQuery,[user_id]);
    const user = userData[0];
    // get the concert data by service_id
    const getConcertQuery = `SELECT * FROM Users WHERE id = ?`;
    const [concertData] = pool.query(getConcertQuery,[service_id]);
    const concert = concertData[0];
    // create a booking -> user_id, service_id, date, time_slot

    const createBookingQuery = 'INSERT INTO Bookings(user_id, service_id, date, time_slot)'
    const [results] = pool.execute()
    
};

const viewBooking = (req, res) => {};

const viewAllBookings = (req, res) => {};

const deleteBooking = (req, res) => {};

module.exports = {
  createBooking,
  viewBooking,
  deleteBooking,
  viewAllBookings,
};
