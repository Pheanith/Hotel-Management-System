import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationTypeForm = ({ onClose, accommodationTypeId = null }) => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        image: null,
    });

    // Fetch existing accommodation data if editing
    useEffect(() => {
        if (accommodationTypeId) {
            axios.get(`http://localhost:5000/api/accommodations/${accommodationTypeId}`)
                .then((response) => {
                    setFormData({
                        type_name: response.data.type_name,
                        description: response.data.description,
                        image: null, // Allow user to upload new image
                    });
                })
                .catch((error) => console.error('Error fetching accommodation data:', error));
        }
    }, [accommodationTypeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = new FormData();
        for (let key in formData) {
            updatedFormData.append(key, formData[key]);
        }

        try {
            if (accommodationTypeId) {
                await axios.put(`http://localhost:5000/api/accommodations/${accommodationTypeId}`, updatedFormData);
            } else {
                await axios.post('http://localhost:5000/api/accommodations', updatedFormData);
            }
            onClose(); // Close form on success
        } catch (error) {
            console.error('Error saving accommodation type:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="accommodation-type-form">
            <h2>{accommodationTypeId ? 'Edit' : 'Add'} Accommodation Type</h2>
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
                {formData.image && <div><strong>Selected Image:</strong> {formData.image.name}</div>}
            </div>

            <div className="form-actions">
                <button type="submit" className="btn submit-btn">{accommodationTypeId ? 'Save Changes' : 'Add Accommodation'}</button>
                <button type="button" onClick={onClose} className="btn cancel-btn">Cancel</button>
            </div>
        </form>
    );
};

export default AccommodationTypeForm;
