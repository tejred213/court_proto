const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Set up Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/court', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Temporary User Schema for unapproved users
const tempUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  isApproved: { type: Boolean, default: false }
});

// Main User Schema for approved users
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});

// Create models for both collections
const TempUser = mongoose.model('TempUser', tempUserSchema);
const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = 'your_secret_key'; // Store in environment variable for production

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Add user info to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if the email already exists in the User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the email exists in the TempUser collection
    const existingTempUser = await TempUser.findOne({ email });
    if (existingTempUser) {
      return res.status(200).json({ message: 'User already exists in TempUser' });
    }

    // If no existing user, create a new TempUser
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTempUser = new TempUser({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Default role as 'user'
    });

    await newTempUser.save();
    res.status(201).json({ message: 'User created successfully, waiting for approval' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the main User collection
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Send token and user info
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to check if the user exists in the TempUser collection
app.post('/api/check-temp-user', async (req, res) => {
  const { email } = req.body;

  try {
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(404).json({ message: 'User not found in TempUser' });
    }

    res.status(200).json({ message: 'User found in TempUser collection' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all users in the TempUser collection (protected)
app.get('/api/temp-users', authenticateToken, async (req, res) => {
  try {
    const tempUsers = await TempUser.find({});
    res.status(200).json(tempUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching temp users' });
  }
});

// Route to approve a temp user (move to main User collection)
app.post('/api/approve-user', authenticateToken, async (req, res) => {
  const { id } = req.body;
  
  try {
    const tempUser = await TempUser.findById(id);
    if (!tempUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newUser = new User({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: tempUser.role,
    });

    await newUser.save();
    await TempUser.findByIdAndDelete(id);

    res.status(200).json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user' });
  }
});

// Route to reject a temp user (delete from TempUser collection)
app.post('/api/reject-user', authenticateToken, async (req, res) => {
  const { id } = req.body;

  try {
    const tempUser = await TempUser.findById(id);
    if (!tempUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await TempUser.findByIdAndDelete(id);
    res.status(200).json({ message: 'User rejected and deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting user' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
