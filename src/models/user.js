const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

exports.createUser = async (data) => {
  const { username, email, password, role } = data;
   password = await bcrypt.hash(password, 10);

  const res = await db.query(
    'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3,$4) RETURNING id, username, email, role',
    [username, email, password, role]
  );

  return res.rows[0];
};

// Login
exports.loginUser = async (email, password) => {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = res.rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: '1d',
  });

  return { user, token };
};
// Get All
exports.getAllUsers = async () => {
  const res = await db.query('SELECT * FROM users');
  return res.rows;
};

// Get One by ID
exports.getUserById = async (id) => {
  const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0];
};

// Update
exports.updateUser = async (id, data) => {
  const { name, email, password, role } = data;
  const res = await db.query(
    `UPDATE users 
     SET name = $1, email = $2, password = $3, role = $4 
     WHERE id = $5 
     RETURNING *`,
    [name, email, password, role, id]
  );
  return res.rows[0];
};

// Delete
exports.deleteUser = async (id) => {
  const res = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};
