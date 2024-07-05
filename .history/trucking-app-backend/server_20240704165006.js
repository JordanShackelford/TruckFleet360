const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const users = [
  // Replace this with the hashed password you get from /hash-password/password route
  { id: 1, email: 'user@example.com', password: '$2b$10$yourHashedPasswordHere' }
];

app.get('/hash-password/:password', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.params.password, 10);
  res.send(hashedPassword);
});

app.post('/api/login', async (req, res) => {
  console.log('Received login request');
  console.log('Request body:', req.body);
  try {
    const { email, password } = req.body;
    console.log('Received login attempt for:', email);
    const user = users.find(u => u.email === email);
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isPasswordMatch);
      if (isPasswordMatch) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful', token });
      } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://172.20.10.3:${port}`);
});
