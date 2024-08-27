// RoomEdit.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../../components/styles/rooms/RoomEdit.css'; // Ensure the correct path

const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const RoomEdit = ({ show, room, onClose, onUpdate }) => {
    const [roomData, setRoomData] = useState({
        building: '',
        accomodationType: '',
        roomType: '',
        floorNumber: '',
        roomNumber: '',
        price: '',
        status: '',
        availableFrom: '',
        availableTo: '',
        description: ''
    });

    useEffect(() => {
        if (room) {
            setRoomData({
                building: room.building,
                accomodationType: room.accomodationType,
                roomType: room.roomType,
                floorNumber: room.floorNumber,
                roomNumber: room.roomNumber,
                price: room.price,
                status: room.status,
                availableFrom: new Date(room.availableFrom),
                availableTo: new Date(room.availableTo),
                description: room.description
            });
        }
    }, [room]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (name) => (date) => {
        setRoomData(prevState => ({ ...prevState, [name]: date }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...roomData,
                availableFrom: formatDate(roomData.availableFrom),
                availableTo: formatDate(roomData.availableTo)
            };
            await axios.put(`http://localhost:5000/api/rooms/${room.id}`, formattedData);
            onUpdate({ ...room, ...formattedData }); // Update the room in the parent component
            onClose();
        } catch (error) {
            console.error('Error updating room:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="roomedit-main">
            <div className="roomedit-header">
                <h2>Edit Room</h2>
                <ClearOutlinedIcon onClick={onClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="roomedit-form-group">
                    <div className="row1">
                        <input
                            type="text"
                            name="building"
                            placeholder="Building"
                            value={roomData.building}
                            onChange={handleChange}
                        />
                        <select
                            name='accomodationType'
                            value={roomData.accomodationType}
                            onChange={handleChange}>
                            <option value="">Please select accomodation type</option>
                            <option value="hotel room">Hotel room</option>
                            <option value="home stay">Home stay</option>
                        </select>
                        <select
                            name='roomType'
                            value={roomData.roomType}
                            onChange={handleChange}>
                            <option value="">Please select room type</option>
                            <option value="Single Room">Single Room</option>
                            <option value="Double Room">Double Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="King Room">King Room</option>
                            <option value="Queen Room">Queen Room</option>
                        </select>
                    </div>
                    <div className="row2">
                        <select
                            name='floorNumber'
                            value={roomData.floorNumber}
                            onChange={handleChange}>
                            <option value="">Please select floor No.</option>
                            <option value="1st">1st floor</option>
                        </select>
                        <input
                            type="text"
                            name="roomNumber"
                            placeholder="Room number"
                            value={roomData.roomNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row3">
                        <input
                            type="text"
                            name="price"
                            placeholder="$"
                            value={roomData.price}
                            onChange={handleChange}
                        />
                        <select
                            name='status'
                            value={roomData.status}
                            onChange={handleChange}>
                            <option value="">Please select room status</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="in-maintenance">In maintenance</option>
                        </select>
                    </div>
                    <div className="row5">
                        <DatePicker
                            selected={roomData.availableFrom}
                            onChange={handleDateChange('availableFrom')}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available from (DD-MM-YYYY)"
                        />
                        <DatePicker
                            selected={roomData.availableTo}
                            onChange={handleDateChange('availableTo')}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available to (DD-MM-YYYY)"
                        />
                    </div>
                    <div className="row4">
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
                    <button type="submit"> Update </button>
                </div>
            </form>
        </div>
    );
};

export default RoomEdit;
