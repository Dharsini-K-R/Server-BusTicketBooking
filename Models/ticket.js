const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const TicketSchema = new mongoose.Schema({
  numberOfSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bus: {
    type: ObjectId,
    ref: 'Bus',
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
