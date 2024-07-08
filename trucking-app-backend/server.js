const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const User = require('./models/user');
const Trip = require('./models/trip');  // Ensure correct path to your Trip model

connectDB().then(async () => {
  try {
    const testTrip = await Trip.findOne();
    console.log('Test trip found:', testTrip);
  } catch (error) {
    console.error('Error finding test trip:', error);
  }
});
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Registration route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

app.get('/api/trips', async (req, res) => {
  try {
    console.log('Fetching trips');
    const trips = await Trip.find().populate('driver').populate('vehicle');
    console.log('Trips found:', JSON.stringify(trips, null, 2));
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ error: 'Error fetching trips' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
