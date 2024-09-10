//RoomTable.jsx
import React, { useEffect, useState } from 'react';
import '../../components/styles/rooms/RoomTable.css';
import RoomDelete from './RoomDelete';
import RoomEdit from './RoomEdit'; // Import your RoomEdit component
import axios from 'axios';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // For edit modal
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleDeleteClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleEditClick = (room) => {
        setSelectedRoom(room);
        setShowEditModal(true); // Show edit modal
    };

    const handleClose = () => {
        setShowModal(false);
        setShowEditModal(false); // Close edit modal
        setSelectedRoom(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${selectedRoom.room_id}`);
            setRooms(rooms.filter(room => room.room_id !== selectedRoom.room_id));
            handleClose();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    const handleUpdate = (updatedRoom) => {
        setRooms(prevRooms => prevRooms.map(room => (room.room_id === updatedRoom.room_id ? updatedRoom : room)));
        handleClose();
    };
    

    return (
        <div className='room-table-container'>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Room number </th>
                        <th> Room type </th>
                        <th> Accommodation type </th>
                        <th> Availability status </th>
                        <th> Floor number </th>
                        <th> Price per night</th>
                        <th> Description </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={index}>
                            <td>{room.room_id}</td>
                            <td>{room.room_number}</td>
                            <td>{room.room_type_name}</td> {/* Display Room Type Name */}
                            <td>{room.accommodation_type_name}</td> {/* Display Accommodation Type Name */}
                            <td className={
                                room.availability_status === 'Maintenance' ? 'Maintenance'
                                    : room.availability_status === 'Occupied' ? 'Occupied'
                                    : 'Available'
                            }>
                                {room.availability_status}
                            </td>
                            <td>{room.floor_number}</td>
                            <td>{room.price_per_night}</td>
                            <td>{room.description}</td>
                            <td>
                                <span className="edit-icon" role="img" aria-label="edit" onClick={() => handleEditClick(room)}>✏️</span>
                                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(room)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <RoomDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
            )}
            {showEditModal && (
                <RoomEdit show={showEditModal} room={selectedRoom} onClose={handleClose} onUpdate={handleUpdate} />
            )}
        </div>
    );
}

export default RoomTable;
