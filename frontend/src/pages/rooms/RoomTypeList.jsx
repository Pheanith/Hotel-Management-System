import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomTypeList.css';
import AddRoomType from './AddRoomType';
import EditRoomType from './EditRoomType';

const RoomTypeList = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddRoomTypeModal, setShowAddRoomTypeModal] = useState(false);
    const [editingRoomType, setEditingRoomType] = useState(null); // State for editing
    const [showEditRoomTypeModal, setShowEditRoomTypeModal] = useState(false); // State for edit modal

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room_types');
                setRoomTypes(response.data);
            } catch (error) {
                console.error('Error fetching room types:', error);
            }
        };

        fetchRoomTypes();
    }, []);

    const handleEdit = (roomType) => {
        setEditingRoomType(roomType); // Set the room type to be edited
        setShowEditRoomTypeModal(true); // Show the edit modal
    };

    // Updated handleDelete function with confirmation
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this room type?'); // Show confirmation dialog
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/room_types/${id}`);
                setRoomTypes(roomTypes.filter((roomType) => roomType.id !== id));
            } catch (error) {
                console.error('Error deleting room type:', error);
            }
        }
    };

    const addRoomType = async (newRoomType) => {
        try {
            const response = await axios.post('http://localhost:5000/api/room_types', newRoomType);
            setRoomTypes([...roomTypes, response.data]);
            setShowAddRoomTypeModal(false); // Close the modal
        } catch (error) {
            console.error('Error adding room type:', error);
        }
    };

    const updateRoomType = async (updatedRoomType) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/room_types/${updatedRoomType.id}`, updatedRoomType);
            setRoomTypes(roomTypes.map(rt => (rt.id === updatedRoomType.id ? response.data : rt)));
            setEditingRoomType(null); // Clear editing state
            setShowEditRoomTypeModal(false); // Close the modal
        } catch (error) {
            console.error('Error updating room type:', error);
        }
    };
    

    const filteredRoomTypes = roomTypes.filter(roomType =>
        roomType.type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        roomType.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="room-type-list">
            <h1 className="title">Room Types</h1>
            <div className="header">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name, description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button className="add-button" onClick={() => setShowAddRoomTypeModal(true)}>
                    + Add Room
                </button>
            </div>

            {/* Add Room Type Modal */}
            {showAddRoomTypeModal && (
                <div className="modal">
                    <div className="modal-content">
                        <AddRoomType onAddRoomType={addRoomType} onCancel={() => setShowAddRoomTypeModal(false)} />
                    </div>
                </div>
            )}

            {/* Edit Room Type Modal */}
            {showEditRoomTypeModal && (
                <div className="modal">
                    <div className="modal-content">
                        <EditRoomType roomType={editingRoomType} onUpdateRoomType={updateRoomType} onCancel={() => setShowEditRoomTypeModal(false)} />
                    </div>
                </div>
            )}

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Room Type</th>
                        {/* <th>Description</th> */}
                        <th>Capacity</th> {/* New column for Capacity */}
                        <th>Bed Configuration</th> {/* New column for Bed Configuration */}
                        <th>Room Size</th> {/* New column for Room Size */}
                        {/* <th>Price</th> New column for Price */}
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoomTypes.length > 0 ? (
                        filteredRoomTypes.map(roomType => (
                            <tr key={roomType.id}>
                                <td><img src={`http://localhost:5000/${roomType.image_url}`} alt={roomType.type_name} className="room-type-image" /></td>
                                <td>{roomType.type_name}</td>
                                {/* <td>{roomType.description}</td> */}
                                <td>{roomType.capacity}</td> {/* Capacity */}
                                <td>{roomType.bed_configuration}</td> {/* Bed Configuration */}
                                <td>{roomType.room_size}</td> {/* Room Size */}
                                <td>{roomType.description}</td>
                                {/* <td>{roomType.price}</td> Price */}
                                <td>
                                    <button onClick={() => handleEdit(roomType)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(roomType.id)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No room types found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTypeList;
