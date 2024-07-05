require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Password hashing functions
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

const verifyPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

// Mock user database (replace with actual database in production)
const users = [
  { id: 1, email: 'user@example.com', password: '$2b$10$XVLVmIE198ch41IKzS8AVuOzKRkc9zkl.lnIKwufvVGDUe7Yt8h/C' } // This is a hashed version of 'password'
];

// Login route
app.post('/api/login', async (req, res) => {
  console.log('Received login request');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    console.log('Attempting login for email:', email);
    const user = users.find(u => u.email === email);
    if (user) {
      console.log('User found, comparing passwords');
      const passwordMatch = await verifyPassword(password, user.password);
      console.log('Password match:', passwordMatch);
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, sending response');
        res.json({ success: true, message: 'Login successful', token });
      } else {
        console.log('Password mismatch, sending error response');
        res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      console.log('User not found, sending error response');
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Route to hash a password (for development purposes only)
app.get('/api/hash-password/:password', async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.params.password);
    res.json({ hashedPassword });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));