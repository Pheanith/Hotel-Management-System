//RoomTable.jsx
import React, { useEffect, useState } from 'react';
import '../../components/styles/rooms/RoomTable.css';
import RoomDelete from './RoomDelete';
import RoomEdit from './RoomEdit'; // Import your RoomEdit component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        // navigate ('/edit-room', {state: {frompage: 'room-list'}});
    };

    const handleClose = () => {
        setShowModal(false);
        setShowEditModal(false); // Close edit modal
        setSelectedRoom(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${selectedRoom.id}`);
            setRooms(rooms.filter(room => room.id !== selectedRoom.id));
            handleClose();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    const handleUpdate = (updatedRoom) => {
        setRooms(prevRooms => prevRooms.map(room => (room.id === updatedRoom.id ? updatedRoom : room)));
        handleClose();
    };
    

    return (
        <div className='room-table-container'>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th> Building </th>
                        <th> Accommodation Type</th>
                        <th> Room Type </th>
                        <th> Floor Number</th>
                        <th> Room Number</th>
                        <th> Price </th>
                        <th> Status </th>
                        <th> Available From </th>
                        <th> Available To</th>
                        <th> Description </th>
                        <th> Other </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={index}>
                            <td> {room.building}</td>
                            <td> {room.accomodationType}</td>
                            <td> {room.roomType}</td>
                            <td> {room.floorNumber}</td>
                            <td> {room.roomNumber}</td>
                            <td> {room.price}</td>
                            <td className={
                                room.status === 'In maintenance' ? 'in-maintenance'
                                    : room.status === 'Unavailable' ? 'unavailable'
                                    : 'available'
                            }>
                                {room.status}
                            </td>
                            <td> {room.availableFrom}</td>
                            <td> {room.availableTo}</td>
                            <td> {room.description}</td>
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
