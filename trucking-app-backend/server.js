require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/user');
const Trip = require('./models/trip'); // This now refers to your existing Trip model

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);

// Existing login route
app.post('/api/login', async (req, res) => {
  // ... (keep the existing login logic)
});

// Existing registration route
app.post('/api/register', async (req, res) => {
  // ... (keep the existing registration logic)
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Trip routes
app.get('/api/trips', verifyToken, async (req, res) => {
  try {
    const trips = await Trip.find({ driver: req.user.userId })
      .populate('driver', '-password')
      .populate('vehicle');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trips' });
  }
});

app.post('/api/trips', verifyToken, async (req, res) => {
  try {
    const newTrip = new Trip({
      ...req.body,
      driver: req.user.userId
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ error: 'Error creating trip', details: error.message });
  }
});

app.put('/api/trips/:id', verifyToken, async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, driver: req.user.userId },
      req.body,
      { new: true }
    ).populate('driver', '-password').populate('vehicle');
    
    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).json({ error: 'Error updating trip', details: error.message });
  }
});

app.delete('/api/trips/:id', verifyToken, async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ _id: req.params.id, driver: req.user.userId });
    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting trip' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));