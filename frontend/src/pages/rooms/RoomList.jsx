// RoomList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomTable from './RoomTable';
import '../../components/styles/rooms/RoomList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('http://localhost:5000/api/rooms');
            const data = await response.json();
            setRooms(data);
        };
        fetchRooms();
    }, []);

    const handleOpenForm = () => {
        navigate('/add-room'); // Navigate to the RoomForm component
    };

    return (
        <div className="main-room-list-content">
            <div className="room-content-body">
                <h1>Room List</h1>
                <button onClick={handleOpenForm}>Add New Room</button>
            </div>
            <div className="room-table">
                <RoomTable rooms={rooms} />
            </div>
        </div>
    );
};

export default RoomList;
