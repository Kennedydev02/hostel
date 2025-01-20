const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  personalDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  dates: {
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true }
  },
  fees: {
    numberOfDays: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },
  payment: {
    method: { type: String, required: true },
    type: { type: String },
    status: { type: String, default: 'pending' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema); 