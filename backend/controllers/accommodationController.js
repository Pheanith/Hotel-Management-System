import {
  getAllAccommodationTypes,
  getAccommodationTypeById as fetchAccommodationTypeById, // Renamed to avoid conflict
  addAccommodationType,
  updateAccommodationType,
  deleteAccommodationType
} from '../models/accommodationModel.js';

// Get all accommodation types
export const fetchAccommodationTypes = async (req, res) => {
  try {
      const accommodationTypes = await getAllAccommodationTypes();
      res.json(accommodationTypes);
  } catch (error) {
      console.error('Error fetching accommodation types:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

// Get accommodation type by ID
export const getAccommodationTypeById = async (req, res) => {
  try {
      const accommodationType = await fetchAccommodationTypeById(req.params.id); // Use the renamed import here
      if (accommodationType) {
          res.json(accommodationType);
      } else {
          res.status(404).json({ message: 'Accommodation type not found' });
      }
  } catch (error) {
      console.error('Error fetching accommodation type by ID:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new accommodation type
export const createAccommodationType = async (req, res) => {
  try {
      const newAccommodationType = req.body;
      const accommodationTypeId = await addAccommodationType(newAccommodationType);
      res.status(201).json({ message: 'Accommodation type added successfully', accommodationTypeId });
  } catch (error) {
      console.error('Error adding accommodation type:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

// Update accommodation type by ID
export const updateAccommodationTypeById = async (req, res) => {
  try {
      const updated = await updateAccommodationType(req.params.id, req.body);
      if (updated) {
          res.json({ message: 'Accommodation type updated successfully' });
      } else {
          res.status(404).json({ message: 'Accommodation type not found' });
      }
  } catch (error) {
      console.error('Error updating accommodation type:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};

// Delete accommodation type by ID
export const deleteAccommodationTypeById = async (req, res) => {
  try {
      const deleted = await deleteAccommodationType(req.params.id);
      if (deleted) {
          res.json({ message: 'Accommodation type deleted successfully' });
      } else {
          res.status(404).json({ message: 'Accommodation type not found' });
      }
  } catch (error) {
      console.error('Error deleting accommodation type:', error);
      res.status(500).json({ error: 'Server Error' });
  }
};
