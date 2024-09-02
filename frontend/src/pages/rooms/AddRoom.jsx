//AddRoom.jsx
import React, { useState } from "react";
import '../../components/styles/rooms/AddRoom.css';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

const AddRoom = () => {
    const navigate = useNavigate();
    const [building, setBuilding] = useState('');
    const [accomodationType, setAccomodationType] = useState('');
    const [roomType, setRoomType] = useState('');
    const [floorNumber, setFloorNumber] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [availableTo, setAvailableTo] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                building,
                accomodationType,
                roomType,
                floorNumber,
                roomNumber,
                price,
                status,
                availableFrom: formatDate(availableFrom),
                availableTo: formatDate(availableTo),
                description,
            };
            await axios.post('http://localhost:5000/api/rooms', formattedData);
            navigate('/room-list');
        } catch (error) {
            console.error('Error adding room:', error.response ? error.response.data : error.message);
        }
    };

    const handleClose = () => navigate('/room-list');

    return (
        <div className="addroom-main">
            <div className="addroom-header">
                <h2>Add New Room</h2>
                <ClearOutlinedIcon onClick={handleClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="addroom-form-group">
                    <div className="row1">
                        <input
                            type="text"
                            name="building"
                            placeholder="Building"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                        />
                        <select
                            name='accomodationType'
                            value={accomodationType}
                            onChange={(e) => setAccomodationType(e.target.value)}>
                            <option value="">Please select accomodation type</option>
                            <option value="hotel room">Hotel room</option>
                            <option value="home stay">Home stay</option>
                        </select>
                        <select
                            name='roomType'
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}>
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
                            value={floorNumber}
                            onChange={(e) => setFloorNumber(e.target.value)}>
                            <option value="">Please select floor No.</option>
                            <option value="1st">1st floor</option>
                        </select>
                        <input
                            type="text"
                            name="roomNumber"
                            placeholder="Room number"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                        />
                    </div>
                    <div className="row3">
                        <input
                            type="text"
                            name="price"
                            placeholder="$"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <select
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Please select room status</option>
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                            <option value="In maintenance">In maintenance</option>
                        </select>
                    </div>
                    <div className="row5">
                        <DatePicker
                            selected={availableFrom}
                            onChange={(date) => setAvailableFrom(date)}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available from (DD-MM-YYYY)"
                        />
                        <DatePicker
                            selected={availableTo}
                            onChange={(date) => setAvailableTo(date)}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available to (DD-MM-YYYY)"
                        />
                    </div>
                    <div className="row4">
                        <input
                            type="text"
                            name="description"
                            placeholder="Room description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="submit-room">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;
