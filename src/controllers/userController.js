// controllers/userController.js
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const user = await User.createUser(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await User.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// Get All
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get One
exports.getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
