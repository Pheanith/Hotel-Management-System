import React, { useState, useEffect } from "react";
import '../../components/styles/rooms/Room.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Room = () => {
    const [formData, setFormData] = useState({
        checkIn: null,
        checkOut: null,
    });
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);

    // Fetch all rooms excluding maintenance on initial render
    useEffect(() => {
        const fetchAllRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/rooms/available');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching all rooms:', error);
        }
        };

        fetchAllRooms();
    }, []);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms/available', {
                    params: {
                        checkIn: formData.checkIn?.toISOString().split('T')[0],
                        checkOut: formData.checkOut?.toISOString().split('T')[0],
                    },
                });
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching available rooms:', error);
            }
        };

        if (formData.checkIn && formData.checkOut) {
            fetchAvailableRooms();
        }
    }, [formData.checkIn, formData.checkOut]);

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

    const navigate = useNavigate();

    const handleRoomSelection = (room) => {
        setSelectedRooms(prevRooms => {
            if (prevRooms.some(r => r.room_number === room.room_number)) {
                return prevRooms.filter(r => r.room_number !== room.room_number);
            } else {
                return [...prevRooms, room];
            }
        });
    };

    const handleNextButton = () => {
        if (selectedRooms.length > 0) {
            console.log("rooms:", selectedRooms);
            navigate('/select-guest', {
                state: {
                    selectedRooms,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut
                },
            });
            
        } else {
            alert('Please select at least one room.');
        }
    };

    return (
        <div className='main-room-content'>
            <div className='room-content-header'>
                <a>Available Rooms</a>
                <div className="datepicker">
                    <DatePicker
                        selected={formData.checkIn}
                        onChange={(date) => handleDateChange(date, 'checkIn')}
                        dateFormat='dd-MM-yyyy'
                        placeholderText='Please select check-in date'
                        className="dateinput"
                    />
                    <DatePicker
                        selected={formData.checkOut}
                        onChange={(date) => handleDateChange(date, 'checkOut')}
                        dateFormat='dd-MM-yyyy'
                        placeholderText='Please select check-out date'
                        className="dateinput"
                    />
                </div>
                <button className="next-button" onClick={handleNextButton}>Next</button>
            </div>
            <div className="room-cards-container">
                <table className="room-card-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Room Number</th>
                            <th>Room Type</th>
                            <th>Accommodation Type</th>
                            <th>Floor Number</th>
                            <th>Price Per Night</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRooms.some(r => r.room_number === room.room_number)}
                                        onChange={() => handleRoomSelection(room)}
                                    />
                                </td>
                                <td>{room.room_number}</td>
                                <td>{room.room_type_name}</td>
                                <td>{room.accommodation_type_name}</td>
                                <td>{room.floor_number}</td>
                                <td>{room.price_per_night}</td>
                                <td>{room.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Room;
