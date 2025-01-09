const createTicket = (req, res) => {
    //only customer can create ticket
    const concert_id = req.body.concert_id;
    const ticket_type = req.body.ticket_type;
    const quantity = req.body.quantity;
    const user_id = req.user.id;
    const ticket = createTicketService (concert_id, ticket_type, quantity)
};

const getTicket = (req, res) => {
    //anybody
};
module.exports = {
    createTicket,
    getTicket,
};
