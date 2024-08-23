//roomRoutes.js
import express from 'express';
import { getRoom, getRoomByid, createRoom, updateRoomById, deleteRoomById } from '../controllers/roomController.js';

const router = express.Router();

// Get all rooms
router.get('/', getRoom);

// Get a room by ID
router.get('/:id', getRoomByid);

// Add a new room
router.post('/', createRoom);

// Update a room by ID
router.put('/:id', updateRoomById);

// Delete a room by ID
router.delete('/:id', deleteRoomById);

export default router;
