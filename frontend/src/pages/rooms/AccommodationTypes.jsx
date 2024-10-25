import React, { useState, useEffect } from 'react';
import './AccommodationTypes.css';
import { FaSearch } from "react-icons/fa";

const AccommodationTypes = () => {
    // State for accommodation types, pagination, and loading/error states
    const [accommodationTypes, setAccommodationTypes] = useState([]);
    const [newType, setNewType] = useState({ id: null, name: '', description: '', createdAt: '', priceRange: '', numberOfUnits: '' });
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(3); // Number of items per page (set to 3)
    const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

    // Fetch accommodation types from the API with pagination
    useEffect(() => {
        const fetchAccommodationTypes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/accommodation_types?page=${currentPage}&limit=${itemsPerPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch accommodation types');
                }
                const data = await response.json();

                // Map the API response directly as it's an array
                const formattedTypes = data.map(type => ({
                    id: type.accommodation_type_id, // Map accommodation_type_id to id
                    name: type.accommodation_name,   // Map accommodation_name to name
                    description: type.description,   // Use description directly
                    priceRange: type.price_range || '', // Add price range
                    numberOfUnits: type.number_of_units || '' // Add number of units
                }));

                setAccommodationTypes(formattedTypes);
                setTotalPages(Math.ceil(formattedTypes.length / itemsPerPage)); // Set total pages based on the number of fetched items
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodationTypes();
    }, [currentPage, itemsPerPage]); // Re-fetch when currentPage or itemsPerPage changes

    // Function to handle input changes for accommodation types
    const handleChange = (e) => {
        setNewType({ ...newType, [e.target.name]: e.target.value });
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Function to handle adding a new accommodation type
    const handleAdd = async () => {
        if (newType.name && newType.description && newType.priceRange && newType.numberOfUnits) {
            const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time
            const newAccommodationType = { ...newType, createdAt };

            try {
                const response = await fetch('http://localhost:5000/api/accommodation_types', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAccommodationType),
                });

                if (!response.ok) {
                    throw new Error('Failed to add accommodation type');
                }

                const savedType = await response.json();
                const formattedType = {
                    id: savedType.accommodation_type_id,
                    name: savedType.accommodation_name,
                    description: savedType.description,
                    priceRange: savedType.price_range || '', // Include price range
                    numberOfUnits: savedType.number_of_units || '' // Include number of units
                };
                setAccommodationTypes((prev) => [...prev, formattedType]);
                setNewType({ id: null, name: '', description: '', createdAt: '', priceRange: '', numberOfUnits: '' }); // Reset input fields
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // Function to handle editing an accommodation type
    const handleEdit = (id) => {
        const typeToEdit = accommodationTypes.find(type => type.id === id);
        setNewType(typeToEdit);
        setAccommodationTypes(accommodationTypes.filter(type => type.id !== id)); // Remove the type being edited
    };

    // Function to handle deleting an accommodation type
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/accommodation_types/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete accommodation type');
            }

            setAccommodationTypes(accommodationTypes.filter(type => type.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    // Filtered accommodation types based on search input
    const filteredTypes = accommodationTypes.filter(type =>
        type.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        type.description.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Accommodation Type</th> {/* Updated column name */}
                        <th>Description</th>
                        <th>Price Range</th>
                        <th>Number of Units</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTypes.map((type) => (
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.name}</td> {/* Corresponds to updated column name */}
                            <td>{type.description}</td>
                            <td>{type.priceRange}</td>
                            <td>{type.numberOfUnits}</td>
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
                <input
                    type="text"
                    name="priceRange"
                    value={newType.priceRange}
                    onChange={handleChange}
                    placeholder="Price Range"
                    className="search-input"
                />
                <input
                    type="text"
                    name="numberOfUnits"
                    value={newType.numberOfUnits}
                    onChange={handleChange}
                    placeholder="Number of Units"
                    className="search-input"
                />
                <button className="add-button" onClick={handleAdd}>
                    {newType.id ? 'Update Accommodation' : 'Add Accommodation'}
                </button>
            </div>

            {/* Pagination controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AccommodationTypes;
