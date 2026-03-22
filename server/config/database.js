// Import mongoose - library for MongoDB
const mongoose = require('mongoose');

let isConnected = false;

// Function to connect to MongoDB
const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    // Connect to MongoDB using the connection string from .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = conn.connections[0].readyState === 1;

    console.log('✓ MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
