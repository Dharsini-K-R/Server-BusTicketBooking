const router = require('express').Router();
const {
  getBusById,
  newBus,
  getAllBuses,
  getBus,
  deleteBus,
  busByDesandboar,
} = require('../Controllers/bus');

const { isSignedIn, isAuthenticated, isAdmin } = require('../Controllers/auth');
const { getLocationById } = require('../Controllers/location');
const { getUserById } = require('../Controllers/user');

router.param('userId', getUserById);
router.param('destinationId', getLocationById);
router.param('boardingId', getLocationById);
router.param('busId', getBusById);

router.get('/bus/:busId', getBus);
router.get('/bus/:boardingId/:destinationId/all', busByDesandboar);

router.get('/buses', getAllBuses);

router.post(
  '/user/:userId/bus/new',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  newBus
);

router.delete(
  '/user/:userId/bus/:busId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteBus
);

module.exports = router;
