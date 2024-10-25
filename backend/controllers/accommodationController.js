import {
  getAllAccommodationTypes,
  getAccommodationTypeById as fetchAccommodationTypeById,
  addAccommodationType,
  updateAccommodationType,
  deleteAccommodationType
} from '../models/accommodationModel.js';

// Controller to fetch all accommodation types
export const fetchAccommodationTypes = async (req, res) => {
  try {
    const accommodationTypes = await getAllAccommodationTypes();
    res.status(200).json(accommodationTypes);
  } catch (err) {
    console.error('Error fetching accommodation types:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller to fetch accommodation type by ID
export const getAccommodationTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const accommodationType = await fetchAccommodationTypeById(id);
    if (!accommodationType) {
      return res.status(404).json({ error: 'Accommodation type not found' });
    }
    res.status(200).json(accommodationType);
  } catch (err) {
    console.error('Error fetching accommodation type:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller to add a new accommodation type
export const createAccommodationType = async (req, res) => {
  try {
    const insertId = await addAccommodationType(req.body);
    res.status(201).json({ message: 'Accommodation type added', insertId });
  } catch (err) {
    console.error('Error adding accommodation type:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller to update accommodation type by ID
export const modifyAccommodationType = async (req, res) => {
  const { id } = req.params;
  try {
    const isUpdated = await updateAccommodationType(id, req.body);
    if (!isUpdated) {
      return res.status(404).json({ error: 'Accommodation type not found or not updated' });
    }
    res.status(200).json({ message: 'Accommodation type updated' });
  } catch (err) {
    console.error('Error updating accommodation type:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller to delete accommodation type by ID
export const removeAccommodationType = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteAccommodationType(id);
    if (!isDeleted) {
      return res.status(404).json({ error: 'Accommodation type not found or not deleted' });
    }
    res.status(200).json({ message: 'Accommodation type deleted' });
  } catch (err) {
    console.error('Error deleting accommodation type:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
