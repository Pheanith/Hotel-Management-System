// routes/reservationRoutes.js
import express from 'express';
import { fetchReservationById, addNewReservation, modifyReservationById, removeReservationById, fetchAllReservations, updateCheckInStatus, updateCheckOutStatus} from '../controllers/reservationController.js';


const router = express.Router();

// Get all reservations
router.get('/', fetchAllReservations);

// Get reservation by ID
router.get('/:reservation_id', fetchReservationById);

// Create a new reservation
router.post('/', addNewReservation);

// Update reservation by ID
router.put('/:reservation_id', modifyReservationById);

// Update reservation status
router.put('/:reservation_id/checkin', updateCheckInStatus);

//Update reservation status
router.put('/:reservation_id/checkout', updateCheckOutStatus);

// Delete reservation by ID
router.delete('/:reservation_id', removeReservationById);

export default router;