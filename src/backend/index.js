require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://hostel.hudumacenter.org',
    'https://admin.hudumacenter.org',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Routes
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For Vercel 