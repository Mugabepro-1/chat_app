const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET 

const UserController = {
  // Get user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('-password'); // Exclude password field
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-password'); // Exclude password field
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Create a test user (admin)
    async createUser(req, res){
    const { name, email, password, profilePic, isAdmin, status} = req.body;
  
    let user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      profilePic,
      isAdmin,
      status,
    });
  
    user = await user.save();
  
    if (!user) {
      return res.status(500).send("User cannot be created");
    }
  
    res.send(user);
  },

  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already in use' });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profilePicture: '',
        status: 'offline',
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      // Generate JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });

      res.json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get user profile
  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude password field
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Update user profile
  async updateUserProfile(req, res) {
    try {
      const { username, profilePicture, status } = req.body;

      const updatedData = {};
      if (username) updatedData.username = username;
      if (profilePicture) updatedData.profilePicture = profilePicture;
      if (status) updatedData.status = status;

      const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });

      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },
    async deleteUser(req, res){
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res.status(200).json({ success: true, message: "User deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  }
};

module.exports = UserController;





