import express from 'express';  // Use import instead of require
import db from '../utils/db.js'; // Add .js extension for ES module compatibility

const router = express.Router();

// Fetch all admins
router.get('/admins', async (req, res) => {
  try {
    const [admins] = await db.query('SELECT id, username, role, created_at, is_active FROM admins');
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).send('Error fetching admins');
  }
});

export default router; // Use export default instead of module.exports
