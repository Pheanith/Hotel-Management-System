import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservationById,
    deleteReservationById
} from '../controllers/reservationController.js'; // Adjust the import to match the correct function names

const router = express.Router();

// Define routes
router.post('/reservations', createReservation); // Adjust the endpoint as necessary
router.get('/reservations', getAllReservations);
router.get('/reservations/:id', getReservationById);
router.put('/reservations/:id', updateReservationById);
router.delete('/reservations/:id', deleteReservationById);

export default router;
