// src/components/RoomFeatures.jsx
import React, { useState } from 'react';
import './RoomFeatures.css';

const RoomFeatures = () => {
    // Mock state for room features
    const [roomFeatures, setRoomFeatures] = useState([
        { id: 1, name: 'Wi-Fi', description: 'High-speed internet', createdAt: '2024-01-01 12:00:00' },
        { id: 2, name: 'Air Conditioning', description: 'Climate control', createdAt: '2024-01-02 12:00:00' },
        { id: 3, name: 'Balcony', description: 'Private outdoor space', createdAt: '2024-01-03 12:00:00' },
    ]);

    const [newFeature, setNewFeature] = useState({ id: null, name: '', description: '', createdAt: '' });

    // Function to handle input changes
    const handleChange = (e) => {
        setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
    };

    // Function to handle adding a new room feature
    const handleAdd = () => {
        if (newFeature.name && newFeature.description) {
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time
            setRoomFeatures((prev) => [
                ...prev,
                { id: prev.length + 1, createdAt, ...newFeature }, // Automatically assign new ID
            ]);
            setNewFeature({ id: null, name: '', description: '', createdAt: '' }); // Reset input fields
        }
    };

    // Function to handle editing a room feature
    const handleEdit = (id) => {
        const featureToEdit = roomFeatures.find(feature => feature.id === id);
        setNewFeature(featureToEdit);
        setRoomFeatures(roomFeatures.filter(feature => feature.id !== id)); // Remove the feature being edited
    };

    // Function to handle deleting a room feature
    const handleDelete = (id) => {
        setRoomFeatures(roomFeatures.filter(feature => feature.id !== id));
    };

    return (
        <div className="room-features-container">
            <div className="header">
                <h1 className="title">Room Features</h1>
                <button className="add-button" onClick={handleAdd}>
                    Add Room Feature
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
                <button className="search-button">Search</button>
            </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roomFeatures.map((feature) => (
                        <tr key={feature.id}>
                            <td>{feature.id}</td>
                            <td>{feature.name}</td>
                            <td>{feature.description}</td>
                            <td>{feature.createdAt}</td>
                            <td className="actions-column">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => handleEdit(feature.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(feature.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for adding or editing room features */}
            <div className="add-form">
                <input
                    type="text"
                    name="name"
                    value={newFeature.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="search-input"
                />
                <input
                    type="text"
                    name="description"
                    value={newFeature.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="search-input"
                />
                <button className="add-button" onClick={handleAdd}>
                    {newFeature.id ? 'Update Feature' : 'Add Feature'}
                </button>
            </div>
        </div>
    );
};

export default RoomFeatures;
