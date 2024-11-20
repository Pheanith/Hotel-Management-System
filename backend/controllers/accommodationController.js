import accommodationModel from '../models/accommodationModel.js';

const accommodationController = {
  // Create a new accommodation type
  createAccommodationType: async (req, res) => {
    try {
      const { type_name, description } = req.body;
      const image = req.file ? req.file.path : null;

      // Check if required fields are provided
      if (!type_name || !description) {
        return res.status(400).json({ error: 'Type name and description are required.' });
      }

      const newId = await accommodationModel.createAccommodationType(type_name, description, image);
      res.status(201).json({ id: newId, message: 'Accommodation type created successfully.' });
    } catch (error) {
      console.error('Error in createAccommodationType:', error);
      res.status(500).json({ error: 'An error occurred while creating accommodation type.', details: error.message });
    }
  },

  // Get all accommodation types
  getAllAccommodationTypes: async (req, res) => {
    try {
      const types = await accommodationModel.getAllAccommodationTypes();
      res.status(200).json(types);
    } catch (error) {
      console.error('Error in getAllAccommodationTypes:', error);
      res.status(500).json({ error: 'An error occurred while retrieving accommodation types.', details: error.message });
    }
  },

  // Get accommodation type by ID
  getAccommodationTypeById: async (req, res) => {
    try {
      const id = req.params.id;
      const type = await accommodationModel.getAccommodationTypeById(id);
      
      if (!type) {
        return res.status(404).json({ error: 'Accommodation type not found.' });
      }
      
      res.status(200).json(type);
    } catch (error) {
      console.error('Error in getAccommodationTypeById:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the accommodation type.', details: error.message });
    }
  },

  // Update an accommodation type
  updateAccommodationType: async (req, res) => {
    try {
      const id = req.params.id;
      const { type_name, description } = req.body;
      const image = req.file ? req.file.path : null;

      if (!type_name || !description) {
        return res.status(400).json({ error: 'Type name and description are required.' });
      }

      await accommodationModel.updateAccommodationType(id, type_name, description, image);
      res.status(200).json({ message: 'Accommodation type updated successfully.' });
    } catch (error) {
      console.error('Error in updateAccommodationType:', error);
      res.status(500).json({ error: 'An error occurred while updating the accommodation type.', details: error.message });
    }
  },

  // Delete an accommodation type
  deleteAccommodationType: async (req, res) => {
    try {
      const id = req.params.id;
      await accommodationModel.deleteAccommodationType(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteAccommodationType:', error);
      res.status(500).json({ error: 'An error occurred while deleting the accommodation type.', details: error.message });
    }
  }
};

export default accommodationController;
