import React, { useState } from 'react';
import RoomDelete from './RoomDelete';
import '../../components/styles/rooms/RoomTable.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RoomTable = ({ rooms, updateRoom }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 3;

    const navigate = useNavigate(); // Initialize useNavigate

    const handleDeleteClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleEditClick = (room) => {
        navigate(`/edit-room/${room.id}`); // Navigate to the edit room page
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        setCurrentPage(1); // Reset to the first page when search input changes
    };

    // Filter rooms based on search input
    const filteredRooms = rooms.filter((room) =>
        room.room_number.toLowerCase().includes(searchInput.toLowerCase()) ||
        room.room_type_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        room.accommodation_type_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        room.status.toLowerCase().includes(searchInput.toLowerCase()) ||
        room.check_in.toLowerCase().includes(searchInput.toLowerCase()) ||
        room.check_out.toLowerCase().includes(searchInput.toLowerCase())
    );

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search rooms..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
                <button className="search-button">
                    <FaSearch />
                </button>
            </div>
            <table className='room-table'>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Room Type</th>
                        <th>Accommodation Type</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.room_number}</td>
                            <td>{room.base_price}</td>
                            <td>{room.status}</td>
                            <td>{room.room_type_name}</td>
                            <td>{room.accommodation_type_name}</td>
                            <td>{room.check_in}</td>
                            <td>{room.check_out}</td>
                            <td>
                                <button onClick={() => handleEditClick(room)}>Edit</button>
                                <button onClick={() => handleDeleteClick(room)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {showModal && <RoomDelete show={showModal} onClose={handleClose} room={selectedRoom} />}
        </>
    );
};

export default RoomTable;
