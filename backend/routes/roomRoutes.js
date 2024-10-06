import express from 'express';
import {
    getRoom,
    getRoomById,
    createRoom,
    updateRoomById,
    deleteRoomById,
    getFreeRooms,
    fetchAccommodationTypes,
    fetchRoomTypes
} from '../controllers/roomController.js';

const router = express.Router();

// Get room types (public route)
router.get('/room_type', fetchRoomTypes);

// Get accommodation types (public route)
router.get('/accommodation_type', fetchAccommodationTypes);

// Get all rooms (public route)
router.get('/', getRoom);

// Get available rooms (public route)
router.get('/available', getFreeRooms);

// Get a room by ID (public route)
router.get('/:id', getRoomById);

// Add a new room (public route)
router.post('/', createRoom);

// Update a room by ID (public route)
router.put('/:id', updateRoomById);

// Delete a room by ID (public route)
router.delete('/:id', deleteRoomById);

export default router;
