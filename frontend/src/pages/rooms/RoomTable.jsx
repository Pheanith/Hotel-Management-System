//RoomTable.jsx
import React, {useEffect, useState} from 'react';
import '../../components/styles/rooms/RoomTable.css';
import { useNavigate } from 'react-router-dom';
import RoomDelete from './RoomDelete';
import axios from 'axios';

const rooms = [
    {building: 'A',accommodationType: 'Hotel Room',roomType: 'Single room', floorNumber: '1', roomNumber: '101', price: '100$', status: 'Available', availableFrom: '', availableTo: '', description: '',other: ''},
    {building: 'A',accommodationType: 'Home Stay',roomType: 'Double room', floorNumber: '2', roomNumber: '201', price: '100$', status: 'Unavailable', availableFrom: '', availableTo: '', description: '',other: ''},
];

const RoomTable = () => {
    const [rooms, setRooms] = useState ([]);
    const [showModal, setShowModal] = useState (false);
    const [selectedRoom, setSelectedRoom] = useState (null);
    // const navigate = useNavigate();

    useEffect (() => {
        axios.get('/room')
            .then(response => setRooms (response.data))
            .catch(error => console.error ('Error fetching rooms:', error));
    }, []);

    const handleDeleteClick = (room) => {
        setSelectedRoom (room);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal (false);
        setSelectedRoom (null);
    };

    const handleDelete = () => {
        axios.delete(`/rooms/${selectedRoom.id}`)
            .then(() => {
                setRooms(rooms.filter(room => room.id !== selectedRoom.id));
                setShowModal(false);
                setSelectedRoom(null);
            })
            .catch(error => console.error('Error deleting room:', error));
    };

    return (
        <div className='room-table-container'>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th> Building </th>
                        <th> Acommodation Type</th>
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
                        <tr key = {index}>
                            <td> {room.building}</td>
                            <td> {room.accommodationType}</td>
                            <td> {room.roomType}</td>
                            <td> {room.floorNumber}</td>
                            <td> {room.roomNumber}</td>
                            <td> {room.price}</td>
                            <td className={
                                room.status === 'In maintenance'? 'in-maintenent'
                                    : room.status === 'Unavailable'? 'unavailable'
                                    :'available'
                                }>
                                {room.status}
                            </td>
                            <td> {room.availableFrom}</td>
                            <td> {room.availableTo}</td>
                            <td> {room.description}</td>
                            <td>
                                <span className="edit-icon" role="img" aria-label="edit">✏️</span>
                                <span className="delete-icon" role="img" aria-label="delete" onClick={() => handleDeleteClick(room)}>🗑️</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <RoomDelete show={showModal} onClose={handleClose} onDelete={handleDelete}/>
            )}
        </div>
    );
}
export default RoomTable;