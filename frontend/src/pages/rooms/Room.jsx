// Room.jsx

import React, { useState, useEffect } from "react";
import '../../components/styles/rooms/Room.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard from "./RoomCard";
import axios from 'axios';

const Room = () => {
    const [formData, setFormData] = useState({
        checkIn: null,
        checkOut: null,
    });
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        if (formData.checkIn && formData.checkOut) {
            const fetchRooms = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/rooms/available', {
                        params: {
                            checkIn: formData.checkIn.toISOString().split('T')[0],  // Format date as yyyy-mm-dd
                            checkOut: formData.checkOut.toISOString().split('T')[0],
                        },
                    });
                    setRooms(response.data);
                } catch (error) {
                    console.error('Error fetching available rooms:', error);
                }
            };

            fetchRooms();
        }
    }, [formData.checkIn, formData.checkOut]);

    const handleDateChange = (date, field) => {
        setFormData({
          ...formData,
          [field]: date,
        });
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
            </div>
            <div className="room-cards-container">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        roomNumber={room.roomNumber}
                        roomType={room.roomType}
                        accomodationType = {room.accomodationType}
                        imageUrl={room.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Room;
