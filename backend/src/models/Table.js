const mongoose = require('mongoose');
const TableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  seats: { type: Number, required: true },
  location: { type: String, default: 'indoor' },
  status: { type: String, default: 'available' }
});
module.exports = mongoose.model('Table', TableSchema);
