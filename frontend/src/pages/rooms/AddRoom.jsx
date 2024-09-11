//AddRoom.jsx
import React, { useEffect, useState } from "react";
import '../../components/styles/rooms/AddRoom.css';
import { useNavigate } from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import axios from 'axios';

const AddRoom = () => {
    const navigate = useNavigate();
    const [room_number, setRoomNumber] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [accommodationTypes, setAccommodationTypes] = useState([]);
    const [availability_status, setAvailabilityStatus] = useState('');
    const [floor_number, setFloorNumber] = useState('');
    const [price_per_night, setPricePerNight] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [selectedAccommodationType, setSelectedAccommodationType] = useState('');

    useEffect(() => {
        // Fetch room types
        axios.get('http://localhost:5000/api/rooms/room_type')
            .then(response => {
                setRoomTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching room types:', error);
            });

        // Fetch accommodation types
        axios.get('http://localhost:5000/api/rooms/accommodation_type')
            .then(response => {
                setAccommodationTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching accommodation types:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                room_number,
                room_type_id: selectedRoomType,
                accommodation_type_id: selectedAccommodationType,
                availability_status,
                floor_number,
                price_per_night,
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
                            name="room_number"
                            placeholder="Room number"
                            value={room_number}
                            onChange={(e) => setRoomNumber(e.target.value)}
                        />
                        <select
                            name='room_type'
                            value={selectedRoomType}
                            onChange={(e) => setSelectedRoomType(e.target.value)}
                        >
                            <option value="">Select Room Type</option>
                            {roomTypes.map((type) => (
                                <option key={type.room_type_id} value={type.room_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>

                        <select
                            name='accommodation_type'
                            value={selectedAccommodationType}
                            onChange={(e) => setSelectedAccommodationType(e.target.value)}
                        >
                            <option value="">Select Accommodation Type</option>
                            {accommodationTypes.map((type) => (
                                <option key={type.accommodation_type_id} value={type.accommodation_type_id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row2">
                        <select
                            name='status'
                            value={availability_status}
                            onChange={(e) => setAvailabilityStatus(e.target.value)}
                        >
                            <option value="">Please select room status</option>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                        <select
                            name='floorNumber'
                            value={floor_number}
                            onChange={(e) => setFloorNumber(e.target.value)}
                        >
                            <option value="">Please select floor No.</option>
                            <option value="1">1st floor</option>
                            <option value="2">2nd floor</option>
                            <option value="3">3rd floor</option>
                        </select>
                    </div>
                    <div className="row3">
                        <input
                            type="text"
                            name="price"
                            placeholder="$"
                            value={price_per_night}
                            onChange={(e) => setPricePerNight(e.target.value)}
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
