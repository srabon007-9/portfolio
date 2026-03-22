// Import mongoose - library for MongoDB
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    // Exit process if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
