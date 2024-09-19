import express from 'express';
import bcrypt from 'bcrypt';
import db from '../utils/db.js'; // Adjust the path if necessary

const router = express.Router();
const saltRounds = 10;

// Registration route
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).send('Username, password, and role are required');
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    // Insert user into the database
    db.query(
      'INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role],
      (err, results) => {
        if (err) {
          console.error('Database error:', err); // Log the error for debugging
          return res.status(500).send('Database error');
        }

        res.status(201).send('User registered successfully');
      }
    );
  });
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Retrieve the hashed password from the database
  db.query(
    'SELECT password_hash FROM admins WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log the error for debugging
        return res.status(500).send('Database error');
      }

      if (results.length === 0) {
        return res.status(401).send('User not found');
      }

      const hashedPassword = results[0].password_hash;

      // Compare the provided password with the hashed password
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          return res.status(500).send('Error comparing passwords');
        }

        if (isMatch) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid credentials');
        }
      });
    }
  );
});

export default router;
