import express from 'express';
import multer from 'multer';
import accommodationModel from '../models/accommodationModel.js';

const router = express.Router();

// Multer storage configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Create Accommodation Type
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { type_name, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!type_name || !description ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newAccommodationId = await accommodationModel.createAccommodationType(type_name, description, image);
    res.status(201).json({ id: newAccommodationId, message: 'Accommodation type created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating accommodation type.', details: error.message });
  }
});

// Get All Accommodation Types
router.get('/', async (req, res) => {
  try {
    const accommodationTypes = await accommodationModel.getAllAccommodationTypes();
    res.status(200).json(accommodationTypes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving accommodation types.', details: error.message });
  }
});

// Get Accommodation Type by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accommodationType = await accommodationModel.getAccommodationTypeById(id);
    if (accommodationType) {
      res.status(200).json(accommodationType);
    } else {
      res.status(404).json({ message: 'Accommodation type not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the accommodation type.', details: error.message });
  }
});

// Update Accommodation Type
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!type_name || !description ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    await accommodationModel.updateAccommodationType(id, type_name, description, image);
    res.status(200).json({ message: 'Accommodation type updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating accommodation type.', details: error.message });
  }
});

// Delete Accommodation Type
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await accommodationModel.deleteAccommodationType(id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting accommodation type.', details: error.message });
  }
});

export default router;
