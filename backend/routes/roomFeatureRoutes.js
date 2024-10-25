import express from 'express';
import { 
    getAllRoomFeatures, 
    getRoomFeatureById, 
    createRoomFeature, 
    updateRoomFeature, 
    deleteRoomFeature 
} from '../controllers/roomFeatureController.js';

const router = express.Router();

// Get all room features
router.get('/', getAllRoomFeatures);

// Get a single room feature by ID
router.get('/:id', getRoomFeatureById);

// Create a new room feature
router.post('/', createRoomFeature);

// Update a room feature by ID
router.put('/:id', updateRoomFeature);

// Delete a room feature by ID
router.delete('/:id', deleteRoomFeature);

export default router;
