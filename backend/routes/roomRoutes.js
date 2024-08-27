//roomRoutes.js
import express from 'express';
import {
    getRoom,
    getRoomById,
    createRoom,
    updateRoomById,
    deleteRoomById
} from '../controllers/roomController.js';

const router = express.Router();

// Get all rooms
router.get('/', getRoom);

// Get a room by ID
router.get('/:id', getRoomById);

// Add a new room
router.post('/', createRoom);

// Update a room by ID
router.put('/:id', updateRoomById);

// Delete a room by ID
router.delete('/:id', deleteRoomById);

export default router;
