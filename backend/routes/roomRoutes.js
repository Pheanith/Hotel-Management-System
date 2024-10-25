// routes/roomRoutes.js

import express from 'express';
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/roomController.js';

const router = express.Router();

// Get all rooms
router.get('/', getAllRooms);

// Get room by ID
router.get('/:id', getRoomById);

// Create a new room
router.post('/', createRoom);

// Update a room by ID
router.put('/:id', updateRoom);

// Delete a room by ID
router.delete('/:id', deleteRoom);

export default router;
