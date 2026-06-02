const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hlapp';
    console.log(`[Database] Connecting to MongoDB at ${connStr}...`);
    
    const conn = await mongoose.connect(connStr);
    
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    global.useMockDb = false;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    console.warn(`[Database Warning] Please ensure MongoDB is installed and running locally, or update MONGODB_URI in the backend .env file.`);
    console.log(`[Database Notice] Resilient Fallback Activated: Running backend in-memory simulation with 15+ Doctors and Patients preloaded!`);
    global.useMockDb = true;
  }
};

module.exports = connectDB;
