import accommodationModel from '../models/accommodationModel.js'; // Adjust the path as necessary

const accommodationController = {
  // Create a new accommodation type
  createAccommodationType: async (req, res) => {
    try {
      const { type_name, description, price_range, number_of_units, general_amenities, target_audience } = req.body;
      const image = req.file ? req.file.path : null;

      // Check if required fields are provided
      if (!type_name || !description || !price_range || !number_of_units || !general_amenities || !target_audience) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Insert into the database
      const newId = await accommodationModel.createAccommodationType(type_name, description, image, price_range, number_of_units, general_amenities, target_audience);
      res.status(201).json({ id: newId, message: 'Accommodation type created successfully.' });
    } catch (error) {
      console.error('Error in createAccommodationType:', error); // Log detailed error
      res.status(500).json({ error: 'An error occurred while creating accommodation type.', details: error.message });
    }
  },

  // Get all accommodation types
  getAllAccommodationTypes: async (req, res) => {
    try {
      const types = await accommodationModel.getAllAccommodationTypes();
      res.status(200).json(types); // Send the list of accommodation types
    } catch (error) {
      console.error('Error in getAllAccommodationTypes:', error); // Log detailed error
      res.status(500).json({ error: 'An error occurred while retrieving accommodation types.', details: error.message });
    }
  },

  // Get a specific accommodation type by ID
  getAccommodationTypeById: async (req, res) => {
    try {
      const id = req.params.id;
      const type = await accommodationModel.getAccommodationTypeById(id);
      
      if (!type) {
        return res.status(404).json({ error: 'Accommodation type not found.' });
      }
      
      res.status(200).json(type); // Send the accommodation type details
    } catch (error) {
      console.error('Error in getAccommodationTypeById:', error); // Log detailed error
      res.status(500).json({ error: 'An error occurred while retrieving the accommodation type.', details: error.message });
    }
  },

  // Update an existing accommodation type
  updateAccommodationType: async (req, res) => {
    try {
      const id = req.params.id;
      const { type_name, description, price_range, number_of_units, general_amenities, target_audience } = req.body;
      const image = req.file ? req.file.path : null;

      // Check if required fields are provided
      if (!type_name || !description || !price_range || !number_of_units || !general_amenities || !target_audience) {
        return res.status(400).json({ error: "All fields are required." });
      }

      await accommodationModel.updateAccommodationType(id, type_name, description, image, price_range, number_of_units, general_amenities, target_audience);
      res.status(200).json({ message: 'Accommodation type updated successfully.' });
    } catch (error) {
      console.error('Error in updateAccommodationType:', error); // Log detailed error
      res.status(500).json({ error: 'An error occurred while updating the accommodation type.', details: error.message });
    }
  },

  // Delete an accommodation type
  deleteAccommodationType: async (req, res) => {
    try {
      const id = req.params.id;
      await accommodationModel.deleteAccommodationType(id);
      res.status(204).send(); // No content response
    } catch (error) {
      console.error('Error in deleteAccommodationType:', error); // Log detailed error
      res.status(500).json({ error: 'An error occurred while deleting the accommodation type.', details: error.message });
    }
  }
};

export default accommodationController;
