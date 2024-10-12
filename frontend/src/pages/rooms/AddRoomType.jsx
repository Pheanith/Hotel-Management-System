// src/components/AddRoomType.jsx
import React, { useState } from 'react';
import RoomTypeService from '../rooms/RoomTypeService';

const AddRoomType = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomType = { name, description };
        try {
            await RoomTypeService.addRoomType(roomType);
            alert('Room type added successfully!');
            setName('');
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
