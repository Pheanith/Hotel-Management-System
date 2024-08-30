// routes/reservationRoutes.js
import express from 'express';
import { fetchReservationById, addNewReservation, modifyReservationById, removeReservationById, fetchAllReservations } from '../controllers/reservationController.js';


const router = express.Router();

// Get all reservations
router.get('/', fetchAllReservations);

// Get reservation by ID
router.get('/:id', fetchReservationById);

// Create a new reservation
router.post('/', addNewReservation);

// Update reservation by ID
router.put('/:id', modifyReservationById);

// Delete reservation by ID
router.delete('/:id', removeReservationById);

export default router;
