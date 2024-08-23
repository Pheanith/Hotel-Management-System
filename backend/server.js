import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'body-parser'; 
const { json } = pkg;
import roomRoutes from './routes/roomRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

