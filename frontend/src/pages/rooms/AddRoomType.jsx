// src/components/AddRoomType.jsx
import React, { useState } from 'react';
import RoomTypeService from '../rooms/RoomTypeService';

const AddRoomType = () => {
    const [name, setName] = useState('');
    const [maxOccupancy, setMaxOccupancy] = useState(1); // Default to 1
    const [price, setPrice] = useState(0.00); // Default to 0
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomType = { name, maxOccupancy, price, description };
        try {
            await RoomTypeService.addRoomType(roomType);
            alert('Room type added successfully!');
            setName('');
            setMaxOccupancy(1); // Reset to default
            setPrice(0.00); // Reset to default
            setDescription('');
        } catch (error) {
            console.error('Error adding room type:', error);
            alert('Failed to add room type.');
        }
    };

    return (
        <div>
            <h2>Add Room Type</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Max Occupancy:</label>
                    <input
                        type="number"
                        value={maxOccupancy}
                        onChange={(e) => setMaxOccupancy(e.target.value)}
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                        step="0.01" // Allows for decimal prices
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Room Type</button>
            </form>
        </div>
    );
};

export default AddRoomType;
