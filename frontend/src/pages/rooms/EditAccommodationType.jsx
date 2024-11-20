import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditAccommodationType.css'; // Ensure this is styled similarly to your "AddAccommodationType" form

const EditAccommodationType = ({ accommodationType, onClose }) => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
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
        <form onSubmit={handleSubmit} className="edit-form">
            <h2>Edit Accommodation Type</h2>

            <div className="form-group">
                <label htmlFor="type_name">Type Name</label>
                <input
                    type="text"
                    id="type_name"
                    name="type_name"
                    value={formData.type_name}
                    onChange={handleChange}
                    placeholder="Enter accommodation type name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a description of the accommodation"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                />
                {formData.image && (
                    <div>
                        <strong>Selected Image:</strong> {formData.image.name}
                    </div>
                )}
            </div>

            <div className="form-actions">
                <button type="submit" className="btn save-btn">Save Changes</button>
                <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
            </div>
        </form>
    );
};

export default EditAccommodationType;
