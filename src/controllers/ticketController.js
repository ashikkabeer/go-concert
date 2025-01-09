const { createTicketService, getTicketService } = require('../services/ticketService');
const createTicket = (req, res) => {
    const concert_id = req.body.concert_id;
    const ticket_type = req.body.ticket_type;
    const quantity = req.body.quantity;
    const ticket = createTicketService(concert_id, ticket_type, quantity);
    res.status(201).json({ message: 'Ticket created successfully', ticket });
};

const getTicket = (req, res) => {
    const ticket_id = req.params.ticket_id;
    const ticket = getTicketService(ticket_id);
    res.status(200).json({ message: 'Ticket fetched successfully', ticket });
};
module.exports = {
    createTicket,
    getTicket,
};
