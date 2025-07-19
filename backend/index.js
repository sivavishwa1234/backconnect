const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Load users data
const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));

// Routes
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});