import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';

const router = express.Router();

// Route to fetch dashboard data
router.get('/dashboard-data', getDashboardData);

export default router;
