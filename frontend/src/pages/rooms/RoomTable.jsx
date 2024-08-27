//RoomTable.jsx
import React, { useEffect, useState } from 'react';
import '../../components/styles/rooms/RoomTable.css';
import RoomDelete from './RoomDelete';
import axios from 'axios';

const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
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

    const handleClose = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/rooms/${selectedRoom.id}`);
            setRooms(rooms.filter(room => room.id !== selectedRoom.id));
            setShowModal(false);
            setSelectedRoom(null);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className='room-table-container'>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th> Building </th>
                        <th> Accomodation Type </th>
                        <th> Room Type </th>
                        <th> Floor Number </th>
                        <th> Room Number </th>
                        <th> Price </th>
                        <th> Status </th>
                        <th> Available From </th>
                        <th> Available To </th>
                        <th> Description </th>
                        <th> Other </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 ? (
                        rooms.map((room, index) => (
                            <tr key={index}>
                                <td>{room.building}</td>
                                <td>{room.accomodationType}</td>
                                <td>{room.roomType}</td>
                                <td>{room.floorNumber}</td>
                                <td>{room.roomNumber}</td>
                                <td>{room.price}</td>
                                <td className={
                                    room.status === 'In maintenance' ? 'in-maintenance'
                                        : room.status === 'Unavailable' ? 'unavailable'
                                        : 'available'
                                }>
                                    {room.status}
                                </td>
                                <td>{room.availableFrom}</td>
                                <td>{room.availableTo}</td>
                                <td>{room.description}</td>
                                <td>
                                    <span className="edit-icon" role="img" aria-label="edit">✏️</span>
                                    <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(room)}>🗑️</span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">No rooms available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showModal && (
                <RoomDelete show={showModal} onClose={handleClose} onDelete={handleDelete} />
            )}
        </div>
    );
}

export default RoomTable;