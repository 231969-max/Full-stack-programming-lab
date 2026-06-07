require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for the lab assignment
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Simple Health Check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'Healthcare HLApp API server is fully operational.',
    timestamp: new Date()
  });
});

// Mount Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/appointments', require('./src/routes/appointmentRoutes'));
app.use('/api/treatments', require('./src/routes/treatmentRoutes'));
app.use('/api/notifications', require('./src/routes/notificationRoutes'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on this server.`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(`[Server Error Handler] ${err.stack}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal server error occurred.'
  });
});

const PORT = process.env.PORT || 5000;

// Start Server and connect Database
const startServer = async () => {
  // Connect to Database
  await connectDB();

  app.listen(PORT, async () => {
    console.log(`[Server] Express listening on http://127.0.0.1:${PORT}`);
    console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Check if database needs seeding
    if (!global.useMockDb) {
      try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
          console.log('\n===============================================================');
          console.log('   [TIP] The database is currently empty!');
          console.log('   To seed 1 Admin, 15 Doctors, and 15 Patients automatically,');
          console.log('   run the following command in a new terminal inside backend:');
          console.log('   -->  npm run seed');
          console.log('===============================================================\n');
        } else {
          console.log(`[Database Info] Verified records present. Current user count: ${userCount}`);
        }
      } catch (err) {
        console.warn(`[Database Warning] Could not check record counts: ${err.message}`);
      }
    } else {
      console.log(`[Database Info] Mock Database Seeding Complete! Preloaded 15 Doctors & 15 Patients in-memory.`);
    }
  });
};

startServer();
