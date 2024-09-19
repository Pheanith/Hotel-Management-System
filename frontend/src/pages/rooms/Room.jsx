import React, { useState, useEffect } from "react";
import '../../components/styles/rooms/Room.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function formatDate(date) {
    if (!date) return null;
    const dt = new Date(date);
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = dt.getFullYear();
    return `${year}-${month}-${day}`;
}

const Room = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        checkIn: null,
        checkOut: null,
    });
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);

    // Fetch all rooms excluding maintenance on initial render
    // useEffect(() => {
    //     const fetchAllRooms = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/rooms/available');
    //         setRooms(response.data);
    //     } catch (error) {
    //         console.error('Error fetching all rooms:', error);
    //     }
    //     };

    //     fetchAllRooms();
    // }, []);

     // Fetch available rooms when check-in or check-out dates change
     useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms/available', {
                    params: {
                        checkIn: formatDate(formData.checkIn),
                        checkOut: formatDate(formData.checkOut),
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
        let newCheckIn = field === 'checkIn' ? date : formData.checkIn;
        let newCheckOut = field === 'checkOut' ? date : formData.checkOut;

        // Update the checkout date if check-in date changes
        if (field === 'checkIn') {
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);
            newCheckOut = nextDay;
        }

        setFormData({
            ...formData,
            checkIn: newCheckIn,
            checkOut: newCheckOut,
        });
    };

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
                        {rooms.length > 0 ? (
                            rooms.map((room, index) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No rooms available for the selected dates.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Room;