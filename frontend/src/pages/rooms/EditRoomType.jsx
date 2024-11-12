import React, { useState, useEffect } from 'react';
import './EditRoomType.css';

const EditRoomType = ({ roomType, onUpdateRoomType, onCancel }) => {
    const [typeName, setTypeName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [bedConfiguration, setBedConfiguration] = useState('');
    const [roomSize, setRoomSize] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (roomType) {
            setTypeName(roomType.type_name);
            setDescription(roomType.description);
            setCapacity(roomType.capacity || ''); // Ensure it has a default value if not available
            setBedConfiguration(roomType.bed_configuration || '');
            setRoomSize(roomType.room_size || '');
            setPrice(roomType.price || '');
            setImage(roomType.image_url);
        }
    }, [roomType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('type_name', typeName);
        formData.append('description', description);
        formData.append('capacity', capacity);
        formData.append('bed_configuration', bedConfiguration);
        formData.append('room_size', roomSize);
        formData.append('price', price);

        // If a new image is selected, append it; otherwise, send the existing image URL.
        if (image) {
            formData.append('image', image);
        } else {
            // If no new image is uploaded, include the existing image URL
            formData.append('image_url', roomType.image_url);
        }

        // Pass the form data to onUpdateRoomType for processing
        await onUpdateRoomType({
            ...roomType,
            type_name: typeName,
            description,
            capacity,
            bed_configuration: bedConfiguration,
            room_size: roomSize,
            price,
            image: roomType.image_url
        });
    };

    return (
        <form onSubmit={handleSubmit} className="edit-room-type-form">
            <h2>Edit Room Type</h2>
            <input
                type="text"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="Room Type Name"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity"
                required
            />
            <input
                type="text"
                value={bedConfiguration}
                onChange={(e) => setBedConfiguration(e.target.value)}
                placeholder="Bed Configuration"
                required
            />
            <input
                type="text"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                placeholder="Room Size (in sq. meters)"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-button">Update Room Type</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default EditRoomType;
