const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://your-frontend.vercel.app' // Replace with your actual frontend URL
  ],
  credentials: true
}));

app.use(express.json());

// Add this root route handler
app.get('/', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    available_routes: {
      login: 'POST /api/login',
      user: 'GET /api/user/:id',
      health: 'GET /api/health'
    }
  });
});

// Your existing API routes
app.post('/api/login', (req, res) => {
  // Your login logic
});

app.get('/api/user/:id', (req, res) => {
  // Your user data logic
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Export for Vercel
module.exports = app;
