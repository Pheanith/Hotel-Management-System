import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddRoom from './AddRoom'; // Import AddRoom Component
import EditRoom from './EditRoom'; // Import EditRoom Component

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [showEditRoomModal, setShowEditRoomModal] = useState(false);

    // Fetch rooms on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    // Handle adding a new room
    const addRoom = async (newRoom) => {
        try {
            const response = await axios.post('http://localhost:5000/api/rooms', newRoom);
            setRooms([...rooms, response.data]);
            setShowAddRoomModal(false);
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    // Handle editing a room
    const handleEdit = (room) => {
        setEditingRoom(room);
        setShowEditRoomModal(true);
    };

    // Handle updating a room after editing
    const updateRoom = async (updatedRoom) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/rooms/${updatedRoom.id}`, updatedRoom);
            setRooms(rooms.map(room => (room.id === updatedRoom.id ? response.data : room)));
            setShowEditRoomModal(false);
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    // Handle deleting a room
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${id}`);
            setRooms(rooms.filter((room) => room.id !== id));
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    // Filter rooms based on search term
    const filteredRooms = rooms.filter(room =>
        room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.room_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.accommodation_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="room-list">
            <h1 className="title">Rooms</h1>
            <div className="header">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by room number, type, accommodation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button className="add-button" onClick={() => setShowAddRoomModal(true)}>
                    + Add Room
                </button>
            </div>

            {/* Add Room Modal */}
            {showAddRoomModal && (
                <div className="modal">
                    <div className="modal-content">
                        <AddRoom onAddRoom={addRoom} onCancel={() => setShowAddRoomModal(false)} />
                    </div>
                </div>
            )}

            {/* Edit Room Modal */}
            {showEditRoomModal && (
                <div className="modal">
                    <div className="modal-content">
                        <EditRoom
                            room={editingRoom}
                            onUpdateRoom={updateRoom}
                            onCancel={() => setShowEditRoomModal(false)}
                        />
                    </div>
                </div>
            )}

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Room Number</th>
                        <th>Floor</th>
                        <th>Room Type</th>
                        <th>Accommodation Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map(room => (
                            <tr key={room.id}>
                                <td>
                                    {room.image_url ? (
                                        <img src={`http://localhost:5000/${room.image_url}`} alt={`Room ${room.room_number}`} className="room-image" />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>{room.room_number}</td>
                                <td>{room.floor}</td>
                                <td>{room.room_type}</td>
                                <td>{room.accommodation_type}</td>
                                <td>{room.price}</td>
                                <td>{room.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(room)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(room.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No rooms found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RoomList;
