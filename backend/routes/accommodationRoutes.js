import express from 'express';
import {
  fetchAccommodationTypes,
  createAccommodationType,
  getAccommodationTypeById,
  modifyAccommodationType,
  removeAccommodationType
} from '../controllers/accommodationController.js'; // Adjust path as necessary

const router = express.Router();

// Route for fetching all accommodation types
router.get('/', fetchAccommodationTypes);

// Route for fetching a specific accommodation type by ID
router.get('/:id', getAccommodationTypeById);

// Route for adding a new accommodation type
router.post('/', createAccommodationType);

// Route for updating an accommodation type by ID
router.put('/:id', modifyAccommodationType);

// Route for deleting an accommodation type by ID
router.delete('/:id', removeAccommodationType);

export default router;
