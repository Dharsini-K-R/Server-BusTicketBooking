const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  boarding: {
    type: ObjectId,
    ref: 'Location',
  },
  destination: {
    type: ObjectId,
    ref: 'Location',
  },
  price: {
    type: Number,
    required: true,
  },

  seats: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Bus', BusSchema);
