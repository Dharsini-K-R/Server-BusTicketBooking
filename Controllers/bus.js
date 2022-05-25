const Bus = require('./../Models/bus');

exports.getBusById = (req, res, next) => {
  const busId = req.params.busId;

  Bus.findById(busId, (err, bus) => {
    console.log(busId);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (bus) {
      next();
    }
  });
};

exports.getAllBuses = (req, res) => {
  console.log('in the function');
  Bus.find().exec((err, buses) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(buses);
  });
};

exports.getBus = (req, res) => {
  const busId = req.params.busId;
  Bus.findById(busId, (err, bus) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(bus);
  });
};

exports.newBus = (req, res) => {
  const bus = new Bus(req.body);
  bus.save((err, bus) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.status(200).json({
      message: 'Bus added successfully',
      bus,
    });
  });
};

exports.deleteBus = (req, res) => {
  const busId = req.params.busId;
  Bus.findByIdAndRemove(busId, (err, bus) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Bus deleted successfully',
    });
  });
};

//getbut based on destination and boardings
exports.busByDesandboar = (req, res) => {
  const destinationId = req.params.destinationId;
  const boardingId = req.params.boardingId;

  Bus.find({
    destination: destinationId,
    boarding: boardingId,
  })
    .populate('destination')
    .populate('boarding')
    .exec((err, buses) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }

      res.status(200).json({
        message: 'Buses fetched successfully',
        buses,
      });
    });
};
