import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccommodationType.css';
import AddAccommodationType from '../rooms/AddAccommodationType.jsx'; 
import EditAccommodationType from './EditAccommodationType.jsx'; 

const AccommodationTypeList = () => {
    const [accommodationTypes, setAccommodationTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddAccommodationModal, setShowAddAccommodationModal] = useState(false);
    const [editingAccommodationType, setEditingAccommodationType] = useState(null);
    const [showEditAccommodationModal, setShowEditAccommodationModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch accommodation types from the backend
    useEffect(() => {
        const fetchAccommodationTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/accommodations');
                setAccommodationTypes(response.data);
            } catch (error) {
                setError('Error fetching accommodation types');
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodationTypes();
    }, []);

    // Handle deleting an accommodation type
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/accommodations/${id}`);
            setAccommodationTypes(accommodationTypes.filter((type) => type.id !== id));
        } catch (error) {
            console.error('Error deleting accommodation type:', error);
        }
    };

    // Handle editing an accommodation type
    const handleEdit = (type) => {
        setEditingAccommodationType(type); 
        setShowEditAccommodationModal(true);
    };

    // Handle adding a new accommodation type
    const handleAdd = () => {
        setShowAddAccommodationModal(true); 
    };

    // Filter accommodation types based on search term
    const filteredAccommodationTypes = accommodationTypes.filter(type =>
        type.type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="accommodation-type-list">
            <h1 className="title">Accommodation Types</h1>
            <div className="header">
                <input
                    type="text"
                    placeholder="Search by name, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleAdd} className="add-button">Add Accommodation</button>
            </div>

            {/* Add Accommodation Type Modal */}
            {showAddAccommodationModal && (
                <div className="modal">
                    <div className="modal-content">
                        <AddAccommodationType onClose={() => setShowAddAccommodationModal(false)} />
                    </div>
                </div>
            )}

            {/* Edit Accommodation Type Modal */}
            {showEditAccommodationModal && (
                <div className="modal">
                    <div className="modal-content">
                        <EditAccommodationType
                            accommodationType={editingAccommodationType}
                            onClose={() => setShowEditAccommodationModal(false)}
                        />
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccommodationTypes.length > 0 ? (
                            filteredAccommodationTypes.map(type => (
                                <tr key={type.id}>
                                    <td>
                                        {type.image ? (
                                            <img
                                                src={`http://localhost:5000/${type.image}`}
                                                alt={type.type_name}
                                                className="accommodation-image"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>{type.type_name}</td>
                                    <td>{type.description}</td>
                                    <td>
                                        <button onClick={() => handleEdit(type)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(type.id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No accommodation types found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AccommodationTypeList;
