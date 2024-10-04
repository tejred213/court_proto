const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your actual connection string)
mongoose.connect('mongodb://localhost:27017/court', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

// Create user model
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || 'user', // Default role as 'user'
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
