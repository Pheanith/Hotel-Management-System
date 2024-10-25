import express from 'express';
import {
    getAllReservations,
    getReservationById,
    addReservation,
    updateReservation,
    deleteReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
});

// Get a reservation by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await getReservationById(id);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservation', error: error.message });
    }
});

// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const reservationId = await addReservation(req.body);
        res.status(201).json({ message: 'Reservation created', reservationId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await updateReservation(id, req.body);
        if (success) {
            res.json({ message: 'Reservation updated' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating reservation', error: error.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const success = await deleteReservation(id);
        if (success) {
            res.json({ message: 'Reservation deleted' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation', error: error.message });
    }
});

export default router;
