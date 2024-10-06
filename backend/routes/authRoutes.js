import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js'; // Adjust the path if necessary
import { findAdminByUsername, updateAdminRefreshToken } from '../models/authModel.js';

const router = express.Router();
const saltRounds = 10;

// Registration route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send('Username, password, and role are required');
  }

  try {
    // Check if the username already exists
    const [existingAdmin] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

    if (existingAdmin.length > 0) {
      return res.status(409).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new admin into the database
    await db.query('INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role,
    ]);

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const admin = await findAdminByUsername(username);
    if (!admin) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    // Save refresh token to the database
    await updateAdminRefreshToken(admin.id, refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
