import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomFeatures.css';

const RoomFeatures = () => {
    const [roomFeatures, setRoomFeatures] = useState([]);
    const [newFeature, setNewFeature] = useState({ id: null, name: '', description: '', createdAt: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Items per page for pagination

    // Fetch room features from API when the component mounts
    useEffect(() => {
        fetchRoomFeatures();
    }, []);

    // Function to fetch all room features from the API
    const fetchRoomFeatures = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/room-features');
            setRoomFeatures(response.data);
        } catch (error) {
            console.error('Error fetching room features:', error);
        }
    };

    // Function to handle input changes for adding/editing features
    const handleChange = (e) => {
        setNewFeature({ ...newFeature, [e.target.name]: e.target.value });
    };

    // Function to handle input changes in the search box
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Function to handle adding a new room feature
    const handleAdd = async () => {
        if (newFeature.name && newFeature.description) {
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

            try {
                if (newFeature.id) {
                    // If editing an existing feature
                    await axios.put(`http://localhost:5000/api/room-features/${newFeature.id}`, { name: newFeature.name, description: newFeature.description });
                } else {
                    // Add a new feature
                    await axios.post('http://localhost:5000/api/room-features', { name: newFeature.name, description: newFeature.description });
                }
                setNewFeature({ id: null, name: '', description: '', createdAt: '' }); // Reset input fields
                fetchRoomFeatures(); // Refresh the list of room features
            } catch (error) {
                console.error('Error adding/updating room feature:', error);
            }
        }
    };

    // Function to handle editing a room feature
    const handleEdit = (id) => {
        const featureToEdit = roomFeatures.find(feature => feature.id === id);
        setNewFeature(featureToEdit);
    };

    // Function to handle deleting a room feature
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/room-features/${id}`);
            fetchRoomFeatures(); // Refresh the list of room features after deletion
        } catch (error) {
            console.error('Error deleting room feature:', error);
        }
    };

    // Filter the room features based on the search term
    const filteredFeatures = roomFeatures.filter((feature) => 
        feature.name.toLowerCase().includes(searchTerm) || 
        feature.description.toLowerCase().includes(searchTerm)
    );

    // Pagination logic
    const indexOfLastFeature = currentPage * itemsPerPage;
    const indexOfFirstFeature = indexOfLastFeature - itemsPerPage;
    const currentFeatures = filteredFeatures.slice(indexOfFirstFeature, indexOfLastFeature);

    const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="room-features-container">
            <div className="header">
                <h1 className="title">Room Features</h1>
                <button className="add-button" onClick={handleAdd}>
                    {newFeature.id ? 'Update Feature' : 'Add Room Feature'}
                </button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
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
                    {currentFeatures.map((feature) => (
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

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

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
