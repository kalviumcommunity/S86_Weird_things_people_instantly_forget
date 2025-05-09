const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully!', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Error signing up user.' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found.' });
  
      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid password.' });
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token, user });
    } catch (err) {
      res.status(500).json({ error: 'Error logging in user.' });
    }
  };