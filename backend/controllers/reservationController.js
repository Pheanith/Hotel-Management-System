// controllers/reservationController.js
import { getReservationById, createReservation, updateReservationById, deleteReservationById, getAllReservations } from  '../models/reservationModel.js';

// Get a reservation by ID
export const fetchReservationById = (req, res) => {
    const { id } = req.params;
    getReservationById(id)
        .then(reservation => res.json(reservation))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Create a new reservation
export const addNewReservation = (req, res) => {
    const reservation = req.body;
    createReservation(reservation)
        .then(id => res.status(201).json({ id }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Update a reservation by ID
export const modifyReservationById = (req, res) => {
    const { id } = req.params;
    const updatedReservation = req.body;
    updateReservationById(id, updatedReservation)
        .then(result => {
            if (result > 0) {
                res.json({ message: 'Reservation updated successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Delete a reservation by ID
export const removeReservationById = (req, res) => {
    const { id } = req.params;
    deleteReservationById(id)
        .then(result => {
            if (result > 0) {
                res.json({ message: 'Reservation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Reservation not found' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Get all reservations
export const fetchAllReservations = (req, res) => {
    getAllReservations()
        .then(reservations => res.json(reservations))
        .catch(err => res.status(500).json({ error: err.message }));
};
