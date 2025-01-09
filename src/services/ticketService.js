const pool = require('../config/db');

const createTicketService = (concert_id, ticket_type, quantity) => {
    // get price from the concert table
    const getConcertQuery = `SELECT * FROM Concerts WHERE id = ?`;
    const [concertData] = pool.query(getConcertQuery, [concert_id]);
    const concert = concertData[0];
    const price = concert.price;
    // create a ticket
    const createTicketQuery = 'INSERT INTO Tickets(concert_id, ticket_type, price, quantity) VALUES(?,?,?,?,?)';
    const [results] = pool.execute(createTicketQuery, [concert_id, ticket_type, price, quantity]);
    return results;
};

const getTicketService = (id) => {
    const getTicketQuery = `SELECT * FROM Tickets WHERE id = ?`;
    const [ticketData] = pool.query(getTicketQuery, [id]);
    return ticketData[0];
};
module.exports = {
    createTicketService,
    getTicketService,
};
