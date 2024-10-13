// src/components/AccommodationTypes.jsx
import React, { useState } from 'react';
import './AccommodationTypes.css';

const AccommodationTypes = () => {
    // Mock state for accommodation types
    const [accommodationTypes, setAccommodationTypes] = useState([
        { id: 1, name: 'Family', description: 'Suitable for families', createdAt: '2024-01-01 12:00:00' },
        { id: 2, name: 'Business', description: 'Ideal for business trips', createdAt: '2024-01-02 12:00:00' },
        { id: 3, name: 'Suite', description: 'Luxurious accommodation', createdAt: '2024-01-03 12:00:00' },
    ]);

    const [newType, setNewType] = useState({ id: null, name: '', description: '', createdAt: '' });

    // Function to handle input changes
    const handleChange = (e) => {
        setNewType({ ...newType, [e.target.name]: e.target.value });
    };

    // Function to handle adding a new accommodation type
    const handleAdd = () => {
        if (newType.name && newType.description) {
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time
            setAccommodationTypes((prev) => [
                ...prev,
                { id: prev.length + 1, createdAt, ...newType }, // Automatically assign new ID
            ]);
            setNewType({ id: null, name: '', description: '', createdAt: '' }); // Reset input fields
        }
    };

    // Function to handle editing an accommodation type
    const handleEdit = (id) => {
        const typeToEdit = accommodationTypes.find(type => type.id === id);
        setNewType(typeToEdit);
        setAccommodationTypes(accommodationTypes.filter(type => type.id !== id)); // Remove the type being edited
    };

    // Function to handle deleting an accommodation type
    const handleDelete = (id) => {
        setAccommodationTypes(accommodationTypes.filter(type => type.id !== id));
    };

    return (
        <div className="accommodation-types-container">
            <div className="header">
                <h1 className="title">Accommodation Types</h1>
                <button className="add-button" onClick={handleAdd}>
                    Add Accommodation
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
                    {accommodationTypes.map((type) => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.name}</td>
                            <td>{type.description}</td>
                            <td>{type.createdAt}</td>
                            <td className="actions-column">
                                <button
                                    className="btn btn-edit"
                                    onClick={() => handleEdit(type.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-delete"
                                    onClick={() => handleDelete(type.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Form for adding or editing accommodation types */}
            <div className="add-form">
                <input
                    type="text"
                    name="name"
                    value={newType.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="search-input"
                />
                <input
                    type="text"
                    name="description"
                    value={newType.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="search-input"
                />
                <button className="add-button" onClick={handleAdd}>
                    {newType.id ? 'Update Accommodation' : 'Add Accommodation'}
                </button>
            </div>
        </div>
    );
};

export default AccommodationTypes;
