const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const Booking = require('../models/Booking');

// Add new table
router.post('/tables', async (req, res) => {
  const { tableNumber, seats, location } = req.body;
  const t = new Table({ tableNumber, seats, location });
  await t.save();
  res.status(201).json(t);
});

// List all bookings
router.get('/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('tableId');
  res.json(bookings);
});

module.exports = router;
