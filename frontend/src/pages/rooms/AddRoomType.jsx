import React, { useState } from 'react';
import './AddRoomType.css';

const AddRoomType = ({ onAddRoomType, onCancel }) => {
    const [typeName, setTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [bedConfiguration, setBedConfiguration] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('type_name', typeName);
        formData.append('description', description);
        formData.append('capacity', capacity);
        formData.append('bed_configuration', bedConfiguration);
        formData.append('room_size', roomSize);
        formData.append('price', price);

        // If an image is selected, append it to formData
        if (image) {
            formData.append('image', image);
        }

        onAddRoomType(formData);
        // Reset the form fields after submission
        setTypeName('');
        setDescription('');
        setCapacity('');
        setBedConfiguration('');
        setRoomSize('');
        setPrice('');
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="add-room-type-form">
            <h2>Add Room Type</h2> {/* Title for the form */}
            <input
                type="text"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="Room Type Name"
                required
                className="form-input"
            />
            {/* <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="form-textarea"
            /> */}
            <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity"
                required
                className="form-input"
            />
            <input
                type="text"
                value={bedConfiguration}
                onChange={(e) => setBedConfiguration(e.target.value)}
                placeholder="Bed Configuration"
                required
                className="form-input"
            />
            <input
                type="text"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                placeholder="Room Size (in sq. meters)"
                required
                className="form-input"
            />
            {/* <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
                className="form-input"
            /> */}
             <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="form-textarea"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="file-input"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-button">Add Room Type</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default AddRoomType;
