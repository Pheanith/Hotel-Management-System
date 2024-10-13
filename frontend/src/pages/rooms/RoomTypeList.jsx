import React, { useEffect, useState } from 'react';
import RoomTypeService from '../rooms/RoomTypeService';
import { Link } from 'react-router-dom';
import './RoomTypeList.css'; // Assuming you have CSS for styling

const RoomTypeList = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all room types from API
    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const data = await RoomTypeService.getAllRoomTypes();
                setRoomTypes(data);
            } catch (error) {
                console.error('Error fetching room types:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomTypes();
    }, []);

    // Handle search by filtering room types
    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleDelete = async (id) => {
        try {
            await RoomTypeService.deleteRoomType(id);
            setRoomTypes(roomTypes.filter(roomType => roomType.room_type_id !== id));
            alert('Room type deleted successfully!');
        } catch (error) {
            console.error('Error deleting room type:', error);
            alert('Failed to delete room type.');
        }
    };

    const filteredRoomTypes = roomTypes.filter((roomType) =>
        roomType.name.toLowerCase().includes(searchQuery)
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="room-type-list">
            <div className="header">
                <h1 className="title">Room Types</h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>
                <Link to="/add-room-type" className="add-button">+ Add Room Type</Link>
            </div>
            
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Max Occupancy</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoomTypes.length > 0 ? (
                        filteredRoomTypes.map((roomType, index) => (
                            <tr key={roomType.room_type_id}>
                                <td>{index + 1}</td>
                                <td>{roomType.name}</td>
                                <td>{roomType.max_occupancy}</td>
                                <td>{`$${roomType.price}`}</td>
                                <td>{roomType.description}</td>
                                <td>{new Date(roomType.created_at).toLocaleString()}</td>
                                <td>
                                    <Link to={`/edit-room-type/${roomType.room_type_id}`} className="btn btn-edit">Edit</Link>
                                    <button onClick={() => handleDelete(roomType.room_type_id)} className="btn btn-delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No room types found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTypeList;
