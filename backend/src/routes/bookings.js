const express = require('express');
const router = express.Router();
const { createBooking, getBookingsForDate } = require('../controllers/bookingsController');

router.post('/', createBooking);
router.get('/', getBookingsForDate);

module.exports = router;
