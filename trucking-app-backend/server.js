const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const users = [
  // Replace this with the hashed password you got from the /hash-password/password route
  { id: 1, email: 'user@example.com', password: '$2b$10$Wzajw6p7unRjXylEGIgF7.qq5yjeKM1vZVsdWX4BUPWf9UYadIV7.' }
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
      console.log('Attempting login for email:', email);
      const user = users.find(u => u.email === email);
      if (user) {
        console.log('User found, comparing passwords');
        const passwordMatch = await bcrypt.compare(password, user.password);
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

const cors = require('cors');
app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://172.20.10.3:${port}`);
});
