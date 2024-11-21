import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationTypeForm = ({ onClose, accommodationTypeId = null }) => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        // general_amenities: '',
        // price_range: '',
        // number_of_units: '',
        image: null,
       
    });

    // Fetch existing accommodation data if it's an edit form
    useEffect(() => {
        if (accommodationTypeId) {
            axios.get(`http://localhost:5000/api/accommodations/${accommodationTypeId}`)
                .then((response) => {
                    setFormData({
                        type_name: response.data.type_name,
                        description: response.data.description,
                        image: null, // Don’t pre-fill the image, let user upload a new one
                        // target_audience: response.data.target_audience,
                    });
                })
                .catch((error) => console.error("Error fetching accommodation data:", error));
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
            onClose(); // Close the modal on success
        } catch (error) {
            console.error('Error saving accommodation type:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-accommodation-type-form">
            <h2>{accommodationTypeId ? 'Edit' : 'Add'} Accommodation Type</h2>

            <div className="form-group">
                <input
                    type="text"
                    name="type_name"
                    value={formData.type_name}
                    onChange={handleChange}
                    placeholder="Type Name"
                    required
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="form-textarea"
                />
            </div>

            <div className="form-group">
                <label>Upload Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="file-input"
                />
                {formData.image && (
                    <div>
                        <strong>Selected Image:</strong> {formData.image.name}
                    </div>
                )}
            </div>

            <div className="form-buttons">
                <button type="submit" className="submit-button">
                    {accommodationTypeId ? 'Save Changes' : 'Add Accommodation'}
                </button>
                <button type="button" onClick={onClose} className="cancel-button">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AccommodationTypeForm;
