// Load environment variables from .env file
require('dotenv').config();

// Import required libraries
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Initialize Express app
const app = express();

// Allowed frontend origins (local + deployed)
const extraOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  ...extraOrigins,
].filter(Boolean);

// Middleware
// Allow requests from frontend (CORS)
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (e.g., curl, Postman)
      if (!origin) return callback(null, true);

      const isAllowedExplicit = allowedOrigins.includes(origin);
      const isVercelPreview = origin.endsWith('.vercel.app');

      if (isAllowedExplicit || isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Parse incoming JSON data
app.use(express.json());

// Parse incoming form data
app.use(express.urlencoded({ extended: true }));

// API Routes
// /api/user routes
app.use('/api/user', userRoutes);

// /api/projects routes
app.use('/api/projects', projectRoutes);

// /api/contact routes
app.use('/api/contact', contactRoutes);

// DB health route (useful for deployment diagnostics)
app.get('/api/health/db', async (req, res) => {
  try {
    await connectDB();
    return res.status(200).json({ ok: true, db: 'connected' });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      db: 'disconnected',
      message: error?.message || 'Database connection failed',
    });
  }
});

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'MERN Portfolio Backend is running!' });
});

// Error handling for routes that don't exist
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Get port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Start local server only (Vercel handles serverless runtime)
if (!(process.env.VERCEL === '1' && process.env.NODE_ENV === 'production')) {
  app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║  MERN Portfolio Backend Running        ║
  ║  Server: http://localhost:${PORT}        ║
  ║  API: http://localhost:${PORT}/api       ║
  ╚════════════════════════════════════════╝
  `);
  });
}

module.exports = app;
