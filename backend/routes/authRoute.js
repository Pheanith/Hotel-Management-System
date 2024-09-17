// routes/authRoute.js
import express from 'express';
import authController from '../controllers/authController.js'; // Use ES module syntax

const router = express.Router();

// POST /api/auth/login
router.post('/login', authController.login);

export default router; // Use ES module syntax
