import React, { useState } from 'react';
import './AddRoom.css';

const AddRoom = ({ onAddRoom, onCancel }) => {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('room_number', roomNumber);
        formData.append('room_type', roomType);
        formData.append('accommodation_type', accommodationType);
        formData.append('price', price);
        formData.append('status', status);

        // If an image is selected, append it to formData
        if (image) {
            formData.append('image', image);
        }

        onAddRoom(formData);
        // Reset the form fields after submission
        setRoomNumber('');
        setRoomType('');
        setAccommodationType('');
        setPrice('');
        setStatus('');
        setImage(null);
    };

    return (
        <form onSubmit={handleSubmit} className="add-room-form">
            <h2>Add Room</h2>
            <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Room Number"
                required
                className="form-input"
            />
            <input
                type="text"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="Room Type"
                required
                className="form-input"
            />
            <input
                type="text"
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
                placeholder="Accommodation Type"
                required
                className="form-input"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
                className="form-input"
            />
            <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Status"
                required
                className="form-input"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="file-input"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-button">Add Room</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default AddRoom;
