import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes.js';
import reservationRoute from './routes/reservationRoute.js';
import guestRoute from './routes/guestRoute.js';
import roomTypeRoutes from './routes/roomTypeRoutes.js';



const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Define your routes
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoute);
app.use('/api/guests', guestRoute);
app.use('/api/room_types', roomTypeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
