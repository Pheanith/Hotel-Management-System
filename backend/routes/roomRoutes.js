//roomRoutes.js
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

// Get room type
router.get('/room_type', fetchRoomTypes);

// Get accommodation type
router.get('/accommodation_type', fetchAccommodationTypes);
// Get all rooms
router.get('/', getRoom);

// Get available room
router.get ('/available', getFreeRooms);

// Get a room by ID
router.get('/:id', getRoomById);

// Add a new room
router.post('/', createRoom);

// Update a room by ID
router.put('/:id', updateRoomById);


// Delete a room by ID
router.delete('/:id', deleteRoomById);


export default router;
