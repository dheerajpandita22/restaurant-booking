const Booking = require('../models/Booking');
const Table = require('../models/Table');
const { timesOverlap } = require('../utils/timeUtils');
const crypto = require('crypto');

async function isTableAvailable(tableId, date, startTime, endTime) {
  const bookings = await Booking.find({ tableId, date, status: { $ne: 'cancelled' } });
  for (const b of bookings) {
    if (timesOverlap(startTime, endTime, b.startTime, b.endTime)) return false;
  }
  return true;
}

async function createBooking(req, res) {
  try {
    const { customerName, customerPhone, customerEmail, tableId, date, startTime, endTime, partySize } = req.body;
    const table = await Table.findById(tableId);
    if (!table) return res.status(400).json({ message: 'Table not found' });
    if (partySize > table.seats) return res.status(400).json({ message: 'Party size exceeds table capacity' });
    const available = await isTableAvailable(tableId, date, startTime, endTime);
    if (!available) return res.status(409).json({ message: 'Table not available for selected time' });
    const referenceCode = crypto.randomBytes(4).toString('hex').toUpperCase();
    const booking = new Booking({ customerName, customerPhone, customerEmail, tableId, date, startTime, endTime, partySize, referenceCode });
    await booking.save();
    return res.status(201).json({ message: 'Booking created', referenceCode, bookingId: booking._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getBookingsForDate(req, res) {
  const { date } = req.query;
  const bookings = await Booking.find(date ? { date } : {}).populate('tableId');
  res.json(bookings);
}

module.exports = { createBooking, getBookingsForDate, isTableAvailable };
