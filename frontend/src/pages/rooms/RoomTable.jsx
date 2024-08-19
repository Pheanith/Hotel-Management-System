import React, {useState} from 'react';
import '../../components/styles/rooms/RoomTable.css';
import { useNavigate } from 'react-router-dom';
import RoomDelete from './RoomDelete';

const rooms = [
    {roomType: 'Single room', floorNumber: '1', roomNumber: '101', status: 'Available', other: ''},
    {roomType: 'Double room', floorNumber: '2', roomNumber: '201', status: 'Unavailable', other: ''},
    {roomType: 'Double room', floorNumber: '3', roomNumber: '301', status: 'In maintenent', other: ''}
];

const RoomTable = () => {
    const [showModal, setShowModal] = useState (false);
    const [selectedRoom, setSelectedRoom] = useState (null);
    // const navigate = useNavigate();

    const handleDeleteClick = (room) => {
        setSelectedRoom (room);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal (false);
        setSelectedRoom (null);
    };

    const handleDelete = () => {
        console.log("Deleted room: ", selectedRoom);
        setShowModal(false);
        setSelectedRoom(null);
    };

    return (
        <div className='room-table-container'>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th> Room Type </th>
                        <th> Floor Number</th>
                        <th> Room Number</th>
                        <th> Status </th>
                        <th> Other </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key = {index}>
                            <td> {room.roomType}</td>
                            <td> {room.floorNumber}</td>
                            <td> {room.roomNumber}</td>
                            <td className={
                                room.status === 'In maintenent'? 'in-maintenent'
                                    : room.status === 'Unavailable'? 'unavailable'
                                    :'available'
                                }>
                                {room.status}
                            </td>
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