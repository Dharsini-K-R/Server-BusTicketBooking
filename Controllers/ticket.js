const Ticket = require('../Models/ticket');
const Bus = require('./../Models/bus');

exports.getTicketById = (req, res, next) => {
  const ticketId = req.params.ticketId;
  Ticket.findById(ticketId, (err, ticket) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    next();
  });
};

exports.getTicket = (req, res) => {
  const ticket = req.params.ticketId;
  Ticket.findById(req.params.ticketId, (err, ticket) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(ticket);
  });
};

exports.getAllTickets = (req, res) => {
  Ticket.find().exec((err, tickets) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(tickets);
  });
};

exports.getUserTicket = (req, res) => {
  const userId = req.params.userId;
  Ticket.find({ user: userId })
    .populate('user')
    .exec((err, tickets) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      const data = tickets.map((ticket) => {
        const id = ticket.bus.toString();
        Bus.findById(id)
          .then((bus) => {
            ticket.bus = bus;
          })
          .catch((err) => {
            console.log(err);
          });
        return ticket;
      });
      res.json(data);
    });
};

exports.bookTicket = (req, res) => {
  const ticket = new Ticket(req.body);

  //update the availability of seats in the bus model

  ticket.save((err, ticket) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    const { numberOfSeats, bus } = ticket;
    //minus numberofSeats in availableSeats of bus model

    Bus.findByIdAndUpdate(
      bus,
      {
        $inc: { availableSeats: -numberOfSeats },
      },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.json(ticket);
      }
    );
  });
};

exports.deleteTicket = (req, res) => {
  const ticketId = req.params.ticketId;
  Ticket.findByIdAndRemove(ticketId, (err, ticket) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Ticket deleted successfully',
    });
  });
};
