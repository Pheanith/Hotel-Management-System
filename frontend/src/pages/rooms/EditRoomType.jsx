// src/components/EditRoomType.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoomTypeService from '../rooms/RoomTypeService';

const EditRoomType = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roomType, setRoomType] = useState({ name: '', description: '' });

    useEffect(() => {
        const fetchRoomType = async () => {
            try {
                const data = await RoomTypeService.getRoomTypeById(id);
                setRoomType(data);
            } catch (error) {
                console.error('Error fetching room type:', error);
            }
        };

        fetchRoomType();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RoomTypeService.updateRoomType(id, roomType);
            alert('Room type updated successfully!');
            navigate('/room-types'); // Redirect to room type list
        } catch (error) {
            console.error('Error updating room type:', error);
            alert('Failed to update room type.');
        }
    };

    return (
        <div>
            <h2>Edit Room Type</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={roomType.name}
                        onChange={(e) => setRoomType({ ...roomType, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={roomType.description}
                        onChange={(e) => setRoomType({ ...roomType, description: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Update Room Type</button>
            </form>
        </div>
    );
};

export default EditRoomType;
