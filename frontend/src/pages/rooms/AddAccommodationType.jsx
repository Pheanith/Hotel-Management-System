import React, { useState } from 'react';
import axios from 'axios';

const AddAccommodationType = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.error('Error adding accommodation type:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Add Accommodation Type</h2>
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
                <button type="submit">Add Accommodation Type</button>
                <button type="button" onClick={() => window.history.back()}>Cancel</button> {/* Navigate back */}
            </form>
        </div>
    );
};

export default AddAccommodationType;
