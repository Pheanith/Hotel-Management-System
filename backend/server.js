import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes.js';
import reservationRoute from './routes/reservationRoute.js';
import guestRoute from './routes/guestRoute.js';
import roomTypeRoutes from './routes/roomTypeRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoute from './routes/adminRoute.js';
import dashboardRoute from './routes/dashboardRoutes.js';
import roomFeatureRoutes from './routes/roomFeatureRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import { upload, uploadImage } from './controllers/uploadController.js';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' })); // Adjust this for production
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure the uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Upload endpoint
app.post('/api/upload', upload.single('image'), uploadImage);

// Serve static files (images)
app.use('/uploads', express.static(uploadDir));

// Define your routes
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoute);
app.use('/api/guests', guestRoute);
app.use('/api/room_types', roomTypeRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/auth', authRoutes);
app.use ('/api', adminRoute);
app.use('/api', dashboardRoute); // Route for dashboard data
app.use('/api/room-features', roomFeatureRoutes);
app.use('/api/availability', availabilityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
