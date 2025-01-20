require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'https://hostel.hudumacenter.org',
    'https://admin.hudumacenter.org',
    'http://localhost:3000'  // For local development
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Server is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error(err);
  }
}); 