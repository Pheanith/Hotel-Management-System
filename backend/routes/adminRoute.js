import express from 'express';  // Import express using ES module syntax
import db from '../utils/db.js'; // Import the db utility, ensuring the .js extension for compatibility
import bcrypt from 'bcrypt';     // Import bcrypt for password hashing

const router = express.Router();

// Fetch all admins (GET request)
router.get('/admins', async (req, res) => {
  try {
    const [admins] = await db.query('SELECT id, username, role, created_at, is_active FROM admins');
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).send('Error fetching admins');
  }
});

// Create a new admin (POST request)
router.post('/admins', async (req, res) => {
  const { username, password, role } = req.body;  // Destructure admin data from request body

  // Input validation
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Please provide username, password, and role' });
  }

  try {
    // Check if the username already exists
    const [existingAdmin] = await db.query('SELECT username FROM admins WHERE username = ?', [username]);
    if (existingAdmin.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin into the database
    await db.query('INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)', 
      [username, hashedPassword, role]);

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).send('Error creating admin');
  }
});

// Update an admin by ID (PUT request)
router.put('/admins/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, role, is_active } = req.body; // Destructure fields from request body

  // Input validation
  if (!username || !role || (typeof is_active !== 'boolean' && typeof is_active !== 'number')) {
    return res.status(400).json({ error: 'Please provide a valid username, role, and is_active status' });
  }

  try {
    // Optional: Only hash the password if it was provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update admin in the database
    const query = `UPDATE admins SET 
      username = ?, 
      ${password ? 'password_hash = ?,' : ''} 
      role = ?, 
      is_active = ? 
      WHERE id = ?`;

    const values = password 
      ? [username, hashedPassword, role, is_active, id] 
      : [username, role, is_active, id]; // Conditionally include the password in values if provided

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Error updating admin' });
  }
});

// Delete an admin by ID (DELETE request)
router.delete('/admins/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM admins WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Admin not found');
    }

    res.status(200).send('Admin deleted successfully');
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).send('Error deleting admin');
  }
})
export default router; // Export the router for use in other files
