import * as reservationModel from '../models/reservationModel.js';

// Get all reservations
export const getAllReservations = async () => {
    return await reservationModel.getAllReservations();
};

// Get a reservation by ID
export const getReservationById = async (id) => {
    return await reservationModel.getReservationById(id);
};

// Add a new reservation
export const addReservation = async (reservation) => {
    return await reservationModel.addReservation(reservation);
};

// Update a reservation
export const updateReservation = async (id, updates) => {
    return await reservationModel.updateReservation(id, updates);
};

// Delete a reservation
export const deleteReservation = async (id) => {
    return await reservationModel.deleteReservation(id);
};
