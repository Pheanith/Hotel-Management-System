// RoomEdit.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/rooms/RoomEdit.css'; // Ensure the correct path


const RoomEdit = ({ show, room, onClose, onUpdate }) => {
    const [roomData, setRoomData] = useState({
        room_number: '',
        room_type_id: '',
        accommodation_type_id: '',
        availability_status: '',
        floor_number: '',
        price_per_night: '',
        description: ''
    });

    const [roomTypes, setRoomTypes] = useState([]);
    const [accommodationTypes, setAccommodationTypes] = useState([]);

    useEffect(() => {
        // Fetch room types and accommodation types
        axios.get('http://localhost:5000/api/rooms/room_type')
            .then(response => setRoomTypes(response.data))
            .catch(error => console.error('Error fetching room types:', error));

        axios.get('http://localhost:5000/api/rooms/accommodation_type')
            .then(response => setAccommodationTypes(response.data))
            .catch(error => console.error('Error fetching accommodation types:', error));

        if (room) {
            setRoomData({
                room_number: room.room_number || '',
                room_type_id: room.room_type_id || '',
                accommodation_type_id: room.accommodation_type_id || '',
                availability_status: room.availability_status || '',
                floor_number: room.floor_number || '',
                price_per_night: room.price_per_night || '',
                description: room.description || '',
            });
        }
    }, [room]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prevState => ({ ...prevState, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...roomData
            };
            await axios.put(`http://localhost:5000/api/rooms/${room.room_id}`, formattedData);
            onUpdate({ ...room, ...formattedData });
            onClose();
        } catch (error) {
            console.error('Error updating room:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="roomedit-header">
                <h2>Edit Room</h2>
                <ClearOutlinedIcon onClick={onClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="roomedit-form-group">
                    <div className="row1">
                        <input
                            type="text"
                            name="room_number"
                            placeholder="Room number"
                            value={roomData.room_number}
                            onChange={handleChange}
                        />
                        <select
                            name='accommodation_type_id'
                            value={roomData.accommodation_type_id}
                            onChange={handleChange}>
                            <option value="">Select Accommodation Type</option>
                            {accommodationTypes.map(type => (
                                <option key={type.accommodation_type_id} value={type.accommodation_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name='room_type_id'
                            value={roomData.room_type_id}
                            onChange={handleChange}>
                            <option value="">Select Room Type</option>
                            {roomTypes.map(type => (
                                <option key={type.room_type_id} value={type.room_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row2">
                        <select
                            name='floor_number'
                            value={roomData.floor_number}
                            onChange={handleChange}>
                            <option value="">Select Floor No.</option>
                            <option value="1">1st floor</option>
                            <option value="2">2nd floor</option>
                            <option value="3">3rd floor</option>
                        </select>
                        <input
                            type="text"
                            name="price_per_night"
                            placeholder="$"
                            value={roomData.price_per_night}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row3">
                        <select
                            name='availability_status'
                            value={roomData.availability_status}
                            onChange={handleChange}>
                            <option value="">Select Room Status</option>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div className="row5">
                        <input
                            type="text"
                            name="description"
                            placeholder="Room description"
                            value={roomData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="submit-room">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default RoomEdit;
