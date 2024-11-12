import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import {
    createRoomType,
    getRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
} from '../controllers/roomTypeController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename
    },
});

const upload = multer({ storage }); // Initialize multer with the storage configuration

// Create a new room type
router.post('/', upload.single('image'), createRoomType);

// Get all room types
router.get('/', getRoomTypes);

// Get a specific room type by ID
router.get('/:id', getRoomTypeById);

// Update a room type by ID
router.put('/:id', upload.single('image'), updateRoomType);

// Delete a room type by ID
router.delete('/:id', deleteRoomType);

export default router;