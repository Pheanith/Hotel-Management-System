import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAccommodationType = ({ accommodationType, onClose }) => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        general_amenities: '',
        price_range: '',
        number_of_units: '',
        image: null,
    });

    useEffect(() => {
        setFormData(accommodationType); // Reset form data when the accommodationType prop changes
    }, [accommodationType]);

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
            // Make a PUT request to update the accommodation type
            await axios.put(`http://localhost:5000/api/accommodations/${formData.id}`, updatedFormData);
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error updating accommodation type:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Accommodation Type</h2>
            
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
            
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default EditAccommodationType;
