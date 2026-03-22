// Import mongoose - library for MongoDB
const mongoose = require('mongoose');

let isConnected = false;
let connectionPromise = null;

// Function to connect to MongoDB
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  try {
    // Connect to MongoDB using the connection string from .env file
    // Fail fast to avoid serverless function timeouts.
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
      socketTimeoutMS: 8000,
      maxPoolSize: 10,
    });

    const conn = await connectionPromise;

    isConnected = conn.connections[0].readyState === 1;

    console.log('✓ MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    isConnected = false;
    console.error('✗ MongoDB Connection Error:', error.message);
    throw error;
  } finally {
    connectionPromise = null;
  }
};

module.exports = connectDB;
