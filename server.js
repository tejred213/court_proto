const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
  email: String,
  password: String,
  role: String,
  isApproved: { type: Boolean, default: false }
});

// Main User Schema for approved users
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

// Create models for both collections
const TempUser = mongoose.model('TempUser', tempUserSchema);
const User = mongoose.model('User', userSchema);

// Function to validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Signup route: validate email and check existing users
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if the email already exists in the main User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the email exists in the TempUser collection
    const existingTempUser = await TempUser.findOne({ email });
    if (existingTempUser) {
      return res.status(200).json({ message: 'User already exists' });
    }

    // If no existing user, create a new TempUser
    const hashedPassword = await bcrypt.hash(password, 12);
    const newTempUser = new TempUser({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Default role as 'user'
      isApproved: false // Not yet approved
    });

    await newTempUser.save();
    res.status(201).json({ message: 'User created successfully, waiting for approval' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Route to get all users in the TempUser collection
app.get('/api/temp-users', async (req, res) => {
  try {
    const tempUsers = await TempUser.find({});
    res.status(200).json(tempUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching temp users' });
  }
});

// Route to approve a temp user (move to main User collection)
app.post('/api/approve-user', async (req, res) => {
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
app.post('/api/reject-user', async (req, res) => {
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
