const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Updated CORS for production
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://your-frontend-app.vercel.app' // Your production frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
}

// Load users data
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    server: 'Backend API',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = usersData.users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid credentials" 
    });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ 
      success: false,
      message: "Invalid credentials" 
    });
  }
  
  // Return user data without password
  const { password: _, ...userData } = user;
  
  res.json({
    success: true,
    message: "Login successful",
    user: userData
  });
});

app.get('/api/user/:id', (req, res) => {
  const user = usersData.users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const { password, ...userData } = user;
  res.json(userData);
});

// Handle all other routes - for frontend routing in production
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Important for Vercel
