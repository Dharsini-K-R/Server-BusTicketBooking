const Location = require('./../Models/location');

exports.getLocationById = (req, res, next, id) => {
  Location.findById(id, (err, location) => {
    console.log(id);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (location) {
      next();
    }
  });
};

exports.getLocation = (req, res) => {
  const locationId = req.params.locationId;

  Location.findById(locationId, (err, location) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (location) {
      res.json(location);
    }
  });
};

exports.getAllLocations = (req, res) => {
  Location.find().exec((err, locations) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(locations);
  });
};

exports.newLocation = (req, res) => {
  const location = new Location(req.body);
  location.save((err, location) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(location);
  });
};

exports.deleteLocation = (req, res) => {
  const locationId = req.params.locationId;
  Location.findByIdAndRemove(locationId, (err, location) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(location);
  });
};
