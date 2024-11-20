import express from 'express';
import { getRooms, getRoomById, addRoom, updateRoom, deleteRoom } from '../controllers/roomController.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Room routes
router.get('/', getRooms); // Get all rooms
router.get('/:id', getRoomById); // Get a room by ID
router.post('/', upload.single('image'), addRoom); // Create a room
router.put('/:id', upload.single('image'), updateRoom); // Update a room
router.delete('/:id', deleteRoom); // Delete a room

export default router;
