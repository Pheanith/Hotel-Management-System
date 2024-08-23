//AddRoom.jsx
import React, { useState } from "react";
import '../../components/styles/rooms/AddRoom.css';
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

// Utility function to format dates as 'YYYY-MM-DD'
const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

// Utility function to format dates as 'YYYY-MM-DD HH:MM:SS' for DATETIME
const formatDateTime = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const AddRoom = ({ onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromPage } = location.state || {};

    const [formData, setFormData] = useState({
        building: '',
        accommodationType: '', // Fix typo
        roomType: '',
        floorNumber: '',
        roomNumber: '',
        price: '',
        status: '',
        availableFrom: '',
        availableTo: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...formData,
                availableFrom: formatDate(formData.availableFrom),
                availableTo: formatDate(formData.availableTo),
            };
            const response = await axios.post('http://localhost:5000/api/rooms', formattedData);
            console.log(response.data); // Log full response
            navigate('/room-list'); // Navigate to room list page
        } catch (error) {
            console.error('Error adding room:', error.response ? error.response.data : error.message); // Handle error response
        }
    };

    const handleClose = () => {
        navigate('/room-list');
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

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
                            value={formData.building}
                            onChange={handleChange}
                        />
                        <select
                            name='accommodationType' // Fix typo
                            value={formData.accommodationType}
                            onChange={handleChange}>
                            <option value="">Please select accommodation type</option>
                            <option value="hotel room">Hotel room</option>
                            <option value="home stay">Home stay</option>
                        </select>
                        <select
                            name='roomType'
                            value={formData.roomType}
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
                            value={formData.floorNumber}
                            onChange={handleChange}>
                            <option value="">Please select floor No.</option>
                            <option value="1st">1st floor</option>
                        </select>
                        <input
                            type="text"
                            name="roomNumber"
                            placeholder="Room number"
                            value={formData.roomNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row3">
                        <input
                            type="text"
                            name="price"
                            placeholder="$"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <select
                            name='status'
                            value={formData.status}
                            onChange={handleChange}>
                            <option value="">Please select room status</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                            <option value="in-maintenance">In maintenance</option>
                        </select>
                    </div>
                    <div className="row5">
                        <DatePicker
                            selected={formData.availableFrom}
                            onChange={(date) => handleDateChange(date, 'availableFrom')}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available from (DD-MM-YYYY)"
                        />
                        <DatePicker
                            selected={formData.availableTo}
                            onChange={(date) => handleDateChange(date, 'availableTo')}
                            dateFormat='dd-MM-yyyy'
                            placeholderText="Available to (DD-MM-YYYY)"
                        />
                    </div>
                    <div className="row4">
                        <input
                            type="text"
                            name="description"
                            placeholder="Room description"
                            value={formData.description}
                            onChange={handleChange}
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
