// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes.js';
import reservationRoute from './routes/reservationRoute.js';
import guestRoute from './routes/guestRoute.js';
import invoiceRoute from './routes/invoiceRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoute);
app.use('/api/guests', guestRoute);
app.use('api/invoices', invoiceRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
