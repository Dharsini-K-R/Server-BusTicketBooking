const router = require('express').Router();
const {
  bookTicket,
  getTicketById,
  getUserTicket,
  getAllTickets,
  deleteTicket,
} = require('../Controllers/ticket');
const { getUserById } = require('./../Controllers/user');
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require('./../Controllers/auth');

router.param('ticketId', getTicketById);
router.param('userId', getUserById);

router.post(
  '/user/:userId/ticket/book',
  isSignedIn,
  isAuthenticated,
  bookTicket
);

router.get(
  '/user/:userId/bookings/all',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllTickets
);

router.get(
  '/user/:userId/ticket/all',
  isSignedIn,
  isAuthenticated,
  getUserTicket
);

router.delete(
  '/user/:userId/ticket/:ticketId',
  isSignedIn,
  isAuthenticated,
  deleteTicket
);

module.exports = router;
