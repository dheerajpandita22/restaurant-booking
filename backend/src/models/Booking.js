const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:MM
  endTime: { type: String, required: true },   // HH:MM
  partySize: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  referenceCode: { type: String, required: true, unique: true }
});
module.exports = mongoose.model('Booking', BookingSchema);
