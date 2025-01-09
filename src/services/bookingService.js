const pool = require('../config/db');
// id             | int                                    | NO   | PRI | NULL              | auto_increment
//                    |
// | user_id        | int                                    | YES  | MUL | NULL              |
//                    |
// | ticket_id      | int                                    | YES  | MUL | NULL              |
//                    |
// | quantity       | int                                    | NO   |     | NULL              |
//                    |
// | total_price    | decimal(10,2)                          | NO   |     | NULL              |
//                    |
// | booking_status | enum('pending','confirmed','canceled') | YES  |     | pending           |
//                    |
// | created_at     | timestamp                              | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED
//                    |
// | updated_at     | timestamp                              | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
const createBookingService = (ticket_id, user_id) => {
    // get the concert data by service_id
    const getTicketQuery = `SELECT * FROM Tickets WHERE id = ?`;
    const [TicketData] = pool.query(getTicketQuery, [ticket_id]);
    const ticket = TicketData[0];
    // create a booking -> user_id, ticket_id, date, time_slot
    const quantity = ticket.quantity;
    const total_price = ticket.price * ticket.quantity;
    const booking_status = 'confirmed';
    const createBookingQuery = 'INSERT INTO Bookings(user_id, ticket_id, quantity, total_price, booking_status) VALUES(?,?,?,?,?)';
    const [results] = pool.execute(createBookingQuery, [user_id, ticket_id, quantity, total_price, booking_status]);
    return results;
};

const viewBookingService = (id) => {
    const getBookingQuery = `SELECT * FROM Bookings WHERE id = ?`;
    const [bookingData] = pool.query(getBookingQuery, [id]);
    return bookingData[0];
};
const cancelBookingService = (id, booking_status) => {
    const updateBookingQuery = `UPDATE Bookings SET booking_status = ? WHERE id = ?`;
    const [results] = pool.execute(updateBookingQuery, [booking_status, id]);
    return results;
};

const viewAllBookingsService = (user_id) => {
    const getBookingsQuery = `SELECT * FROM Bookings WHERE user_id = ?`;
    const [bookingsData] = pool.query(getBookingsQuery, [user_id]);
    return bookingsData;
};

const deleteBookingService = (id) => {
    const deleteBookingQuery = `DELETE FROM Bookings WHERE id = ?`;
    const [results] = pool.execute(deleteBookingQuery, [id]);
    return results;
};

module.exports = {
    createBookingService,
    viewBookingService,
    deleteBookingService,
    viewAllBookingsService,
    cancelBookingService,
};
