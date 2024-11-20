import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditRoom.css';

const EditRoom = ({ roomData, onUpdateRoom, onCancel }) => {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);  // To store room types
    const [accommodationTypes, setAccommodationTypes] = useState([]);  // To store accommodation types
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState(''); // For error message state

    useEffect(() => {
        // Fetch room types and accommodation types from the backend
        const fetchTypes = async () => {
            try {
                setLoading(true); // Start loading
                const roomTypesResponse = await axios.get('http://localhost:5000/api/room_types');
                const accommodationTypesResponse = await axios.get('http://localhost:5000/api/accommodations');
                setRoomTypes(roomTypesResponse.data);
                setAccommodationTypes(accommodationTypesResponse.data);

                // If roomData is provided, populate the form with its data
                if (roomData) {
                    setRoomNumber(roomData.room_number);
                    setRoomType(roomData.room_type);
                    setAccommodationType(roomData.accommodation_type);
                    setPrice(roomData.price);
                    setStatus(roomData.status);
                }
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                setLoading(false);
                setError('Error fetching room and accommodation types. Please try again.');
                console.error('Error fetching room and accommodation types:', error);
            }
        };

        fetchTypes();
    }, [roomData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading during form submission

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

        axios.post('http://localhost:5000/api/rooms/update', formData)
            .then((response) => {
                onUpdateRoom(response.data); // Pass updated room data to parent
                setLoading(false); // Stop loading
                setRoomNumber('');
                setRoomType('');
                setAccommodationType('');
                setPrice('');
                setStatus('');
                setImage(null); // Clear the form
            })
            .catch((error) => {
                setLoading(false);
                setError('Error updating the room. Please try again.');
                console.error('Error updating the room:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="edit-room-form">
            <h2>Edit Room</h2>

            {loading && <div className="loading-spinner">Loading...</div>}  {/* Show loading spinner if data is loading */}

            {error && <div className="error-message">{error}</div>}  {/* Show error message if there’s an error */}

            <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="Room Number"
                required
                className="form-input"
            />

            <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                required
                className="form-input"
            >
                <option value="">Select Room Type</option>
                {roomTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}  {/* Only display room type name */}
                    </option>
                ))}
            </select>

            <select
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
                required
                className="form-input"
            >
                <option value="">Select Accommodation Type</option>
                {accommodationTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}  {/* Only display accommodation type name */}
                    </option>
                ))}
            </select>

            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
                className="form-input"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="form-input"
            >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
            </select>

            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="file-input"
            />
            <div className="form-buttons">
                <button type="submit" className="submit-button">Update Room</button>
                <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
            </div>
        </form>
    );
};

export default EditRoom;
