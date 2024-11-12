import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is imported

const AddAccommodationType = ({ onClose }) => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        general_amenities: '',
        price_range: '',
        number_of_units: '',
        image: null,
        target_audience: '', // Added target_audience field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = new FormData();
        for (let key in formData) {
            updatedFormData.append(key, formData[key]);
        }

        try {
            // Make a POST request to create a new accommodation type
            await axios.post('http://localhost:5000/api/accommodations', updatedFormData);
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error adding accommodation type:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Accommodation Type</h2>
            
            <input
                type="text"
                name="type_name"
                value={formData.type_name}
                onChange={handleChange}
                placeholder="Type Name"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                type="text"
                name="general_amenities"
                value={formData.general_amenities}
                onChange={handleChange}
                placeholder="General Amenities"
            />
            <input
                type="text"
                name="price_range"
                value={formData.price_range}
                onChange={handleChange}
                placeholder="Price Range"
            />
            <input
                type="number"
                name="number_of_units"
                value={formData.number_of_units}
                onChange={handleChange}
                placeholder="Number of Units"
            />
            {/* Target Audience Field */}
            <input
                type="text"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                placeholder="Target Audience"
                required
            />
            <div>
                <label>Upload Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
                {formData.image && (
                    <div>
                        <strong>Selected Image:</strong> {formData.image.name}
                    </div>
                )}
            </div>
            
            <button type="submit">Add Accommodation</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default AddAccommodationType;
