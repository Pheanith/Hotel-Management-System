import { useState, useEffect } from 'react';
import RoomTable from './RoomTable';
import RoomModal from './RoomModal';
import '../../components/styles/rooms/RoomList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('http://localhost:5000/api/rooms');
            const data = await response.json();
            setRooms(data);
        };
        fetchRooms();
    }, []);

    const handleEditClick = (room) => {
        setSelectedRoom(room); // Pass room data to the modal
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRoom(null);
    };

    const handleSaveRoom = (roomData) => {
        // Save or update the room data here, and refresh the list if necessary
        // For now, we're just logging it
        console.log('Room saved:', roomData);
        handleCloseModal();
    };

    return (
        <div className="main-room-list-content">
            <div className="room-content-body">
                <h1>Room List</h1>
            </div>
            <div className="room-table">
                <RoomTable rooms={rooms} onEdit={handleEditClick} />
            </div>
            <RoomModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                roomData={selectedRoom}
                onSave={handleSaveRoom}
            />
        </div>
    );
};

export default RoomList;