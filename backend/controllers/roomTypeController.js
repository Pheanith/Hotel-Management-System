import db from '../utils/db.js';

// Create a new room type with additional fields: room_size, capacity, bed_configuration, and price
export const createRoomType = async (req, res) => {
    const { type_name, description, capacity, bed_configuration, room_size, price } = req.body;
    const image_url = req.file ? req.file.path : null; // Get the file path from the uploaded file

    try {
        const [result] = await db.query(
            'INSERT INTO room_types (type_name, description, capacity, bed_configuration, room_size, price, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type_name, description, capacity, bed_configuration, room_size, price, image_url]
        );
        
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt; // Initially set updatedAt to createdAt

        res.status(201).json({ 
            id: result.insertId, 
            type_name, 
            description, 
            capacity, 
            bed_configuration, 
            room_size, 
            price, 
            image_url,
            created_at: createdAt,
            updated_at: updatedAt 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Get all room types
export const getRoomTypes = async (req, res) => {
    try {
        const query = 'SELECT * FROM room_types';
        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch room types' });
    }
};

// Get a specific room type by its ID
export const getRoomTypeById = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        const [rows] = await db.query('SELECT * FROM room_types WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }

        res.json(rows[0]); // Return the room type
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Update a specific room type by its ID with the additional fields
export const updateRoomType = async (req, res) => {
    const { id } = req.params;
    const { type_name, description, capacity, bed_configuration, room_size, price } = req.body;

    // Validate the incoming data
    if (!type_name || !description || !capacity || !bed_configuration || !room_size || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // If an image file is uploaded, use it, otherwise keep the existing image URL
    const image_url = req.file ? req.file.path : null;

    try {
        // Check if the room type exists
        const [existingRoomType] = await db.query('SELECT * FROM room_types WHERE id = ?', [id]);
        if (existingRoomType.length === 0) {
            return res.status(404).json({ error: 'Room type not found' });
        }

        // If no new image is provided, use the old image_url (fetch the current room type data first)
        let currentImageUrl = existingRoomType[0].image_url;

        // Update the room type with the provided data
        const query = `
            UPDATE room_types 
            SET 
                type_name = ?, 
                description = ?, 
                capacity = ?, 
                bed_configuration = ?, 
                room_size = ?, 
                price = ?, 
                image_url = ?, 
                updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?`;

        const [result] = await db.query(query, [
            type_name, 
            description, 
            capacity, 
            bed_configuration, 
            room_size, 
            price, 
            image_url || currentImageUrl, // Use the existing image URL if no new image
            id
        ]);

        // If no rows were affected, return a message indicating no changes were made
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'No changes were made. Please check your data.' });
        }

        res.status(200).json({ 
            id, 
            type_name, 
            description, 
            capacity, 
            bed_configuration, 
            room_size, 
            price, 
            image_url: image_url || currentImageUrl, // Return the current image URL
            updated_at: new Date().toISOString() // Return the updated timestamp
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update room type' });
    }
};


// Delete a room type by its ID
export const deleteRoomType = async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM room_types WHERE id = ?';
        await db.query(query, [id]);
        res.status(200).json({ message: 'Room type deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete room type' });
    }
};
