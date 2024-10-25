import React, { useState } from 'react';
import axios from 'axios';

const AddAccommodationType = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(false); // State for loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on form submission
        setError(null); // Reset any previous errors

        try {
            const response = await axios.post('http://localhost:5000/api/accommodation_types', {
                name,
                description,
            });
            // Reset form fields after submission
            setName('');
            setDescription('');
            alert('Accommodation type added successfully!'); // Optional success message
        } catch (error) {
            setError('Error adding accommodation type. Please try again.'); // Set error message
            console.error('Error adding accommodation type:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add Accommodation Type</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show error message */}
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
                <button type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? 'Adding...' : 'Add Accommodation Type'}
                </button>
                <button type="button" onClick={() => window.history.back()}>Cancel</button> {/* Navigate back */}
            </form>
        </div>
    );
};

export default AddAccommodationType;
