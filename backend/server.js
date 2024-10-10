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
import dashboardRoute from './routes/dashboardRoutes.js';
import adminRoute from './routes/adminRoute.js';

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // Adjust this for production
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const PORT = process.env.PORT || 5000;

// Define your routes
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoute);
app.use('/api/guests', guestRoute);
app.use('/api/room_types', roomTypeRoutes);
app.use('/api/accommodation_types', accommodationRoutes);
app.use('/auth', authRoutes);
app.use('/api', dashboardRoute); // Route for dashboard data
app.use('/api', adminRoute);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
