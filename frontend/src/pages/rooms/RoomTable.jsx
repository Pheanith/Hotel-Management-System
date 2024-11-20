// import React, { useState } from 'react';
// import RoomModal from './RoomModal';
// import RoomDelete from './RoomDelete';
// import '../../components/styles/rooms/RoomTable.css';
// import { FaSearch } from 'react-icons/fa';

// const RoomTable = ({ rooms, updateRoom }) => {
//     const [showModal, setShowModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [searchInput, setSearchInput] = useState('');
//     const [isEditing, setIsEditing] = useState(false);

//     const [currentPage, setCurrentPage] = useState(1);
//     const roomsPerPage = 3;

//     const handleDeleteClick = (room) => {
//         setSelectedRoom(room);
//         setShowDeleteModal(true);
//     };

//     const handleEditClick = (room) => {
//         setSelectedRoom(room);
//         setIsEditing(true);
//         setShowModal(true);
//     };

//     const handleAddClick = () => {
//         setSelectedRoom(null);
//         setIsEditing(false);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedRoom(null);
//         setIsEditing(false);
//     };

//     const handleCloseDeleteModal = () => {
//         setShowDeleteModal(false);
//         setSelectedRoom(null);
//     };

//     const handleSearchChange = (e) => {
//         setSearchInput(e.target.value);
//         setCurrentPage(1);
//     };

//     const filteredRooms = rooms.filter((room) =>
//         room.room_number.toLowerCase().includes(searchInput.toLowerCase()) ||
//         room.room_type_name.toLowerCase().includes(searchInput.toLowerCase()) ||
//         room.accommodation_type_name.toLowerCase().includes(searchInput.toLowerCase()) ||
//         room.status.toLowerCase().includes(searchInput.toLowerCase()) ||
//         room.check_in.toLowerCase().includes(searchInput.toLowerCase()) ||
//         room.check_out.toLowerCase().includes(searchInput.toLowerCase())
//     );

//     const indexOfLastRoom = currentPage * roomsPerPage;
//     const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
//     const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
//     const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleSave = (roomData) => {
//         if (isEditing) {
//             updateRoom(selectedRoom.id, roomData);
//         } else {
//             // Add new room logic here
//         }
//         handleCloseModal();
//     };

//     return (
//         <>
//             <div className="search-container">
//                 <input
//                     type="text"
//                     className="search-input"
//                     placeholder="Search rooms..."
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                 />
//                 <button className="search-button">
//                     <FaSearch />
//                 </button>
//                 <button className="add-room-button" onClick={handleAddClick}>
//                     Add Room
//                 </button>
//             </div>
//             <table className="room-table">
//                 <thead>
//                     <tr>
//                         <th>Room Number</th>
//                         <th>Price</th>
//                         <th>Status</th>
//                         <th>Room Type</th>
//                         <th>Accommodation Type</th>
//                         <th>Check-in</th>
//                         <th>Check-out</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentRooms.map((room) => (
//                         <tr key={room.id}>
//                             <td>{room.room_number}</td>
//                             <td>{room.base_price}</td>
//                             <td>{room.status}</td>
//                             <td>{room.room_type_name}</td>
//                             <td>{room.accommodation_type_name}</td>
//                             <td>{room.check_in}</td>
//                             <td>{room.check_out}</td>
//                             <td>
//                                 <button onClick={() => handleEditClick(room)}>Edit</button>
//                                 <button onClick={() => handleDeleteClick(room)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index + 1}
//                         className={currentPage === index + 1 ? 'active' : ''}
//                         onClick={() => handlePageChange(index + 1)}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>

//             {showModal && (
//                 <RoomModal
//                     isOpen={showModal}
//                     onClose={handleCloseModal}
//                     roomData={selectedRoom}
//                     onSave={handleSave}
//                 />
//             )}

//             {showDeleteModal && (
//                 <RoomDelete show={showDeleteModal} onClose={handleCloseDeleteModal} room={selectedRoom} />
//             )}
//         </>
//     );
// };

// export default RoomTable;