import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RoomEdit = () => {
    const { id } = useParams(); // Get room ID from the URL
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        room_num: '',
        room_type: '',
        accommodation_type: '',
        checkin: '',
        checkout: '',
        price: '',
        status: '',
    });

    // Placeholder data for room types and accommodation types
    const roomTypes = ['Single', 'Double', 'Suite']; // Example room types
    const accommodationTypes = ['Hotel', 'Hostel', 'Apartment']; // Example accommodation types

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setRoomData(response.data); // Populate the form with room details
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRoomData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/rooms/${id}`, roomData);
            alert('Room updated successfully!');
            navigate('/room-list'); // Navigate back to the room list
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    return (
        <div className="accommodation-types-container">
            <h2>Edit Room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Room Number:</label>
                    <input
                        type="text"
                        name="room_num"
                        value={roomData.room_num}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Room Type:</label>
                    <select
                        name="room_type"
                        value={roomData.room_type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Room Type</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Accommodation Type:</label>
                    <select
                        name="accommodation_type"
                        value={roomData.accommodation_type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Accommodation Type</option>
                        {accommodationTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Check-in Date:</label>
                    <input
                        type="date"
                        name="checkin"
                        value={roomData.checkin}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Check-out Date:</label>
                    <input
                        type="date"
                        name="checkout"
                        value={roomData.checkout}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={roomData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={roomData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                    </select>
                </div>

                {/* Button container with margin-top */}
                <div className="button-group">
                    <button type="submit" className="add-button">Update Room</button>
                    <button type="button" className="add-button" onClick={() => navigate('/room-list')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default RoomEdit;
