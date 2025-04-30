const express = require('express');
const router = express.Router();
const {
  createBooking,
  approveBooking,
  getAllBookings,
  getUserBookings
} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:user_id', getUserBookings);
router.post('/approve/:id', approveBooking);

module.exports = router;
