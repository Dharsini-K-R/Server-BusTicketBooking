const router = require('express').Router();
const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const {
  getAllLocations,
  getLocationById,
  newLocation,
  deleteLocation,
  getLocation,
} = require('../Controllers/location');
const { getUserById } = require('../Controllers/user');

router.param('locationId', getLocationById);
router.param('userId', getUserById);

router.get('/location/all', getAllLocations);
router.get('/location/:locationId', getLocation);

router.post(
  '/user/:userId/location/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  newLocation
);
router.delete(
  '/user/:userId/location/:locationId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteLocation
);

module.exports = router;
