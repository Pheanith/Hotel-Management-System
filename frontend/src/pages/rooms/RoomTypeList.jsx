import React, { useEffect, useState } from 'react';
import RoomTypeService from '../rooms/RoomTypeService';
import { Link } from 'react-router-dom';
import './RoomTypeList.css'; // Assuming you have CSS for styling
import { FaSearch } from "react-icons/fa";

const RoomTypeList = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false); // State to control the form visibility
    const [currentRoomType, setCurrentRoomType] = useState(null); // State to hold the current room type being edited

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
        roomType.type_name.toLowerCase().includes(searchQuery) ||
        roomType.description.toLowerCase().includes(searchQuery) ||
        (roomType.amenities && roomType.amenities.toLowerCase().includes(searchQuery)) ||
        (roomType.price && roomType.price.toString().includes(searchQuery)) ||
        (roomType.capacity && roomType.capacity.toString().includes(searchQuery)) || // Match capacity
        (roomType.status && roomType.status.toString().includes(searchQuery)) // Match status
    );

    const handleAddOrEdit = (roomType = null) => {
        setCurrentRoomType(roomType);
        setShowForm(true); // Show the form
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setCurrentRoomType(null); // Clear current room type
    };

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
                        placeholder="Search by name, description, amenities, price, capacity, or status..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <button className="search-button">
                        <FaSearch />
                    </button>
                </div>
                <button onClick={() => handleAddOrEdit()} className="add-button">+ Add Room Type</button>
            </div>
            
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Room Type</th>
                        <th>Description</th>
                        <th>Amenities</th>
                        <th>Capacity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRoomTypes.length > 0 ? (
                        filteredRoomTypes.map((roomType) => (
                            <tr key={roomType.room_type_id}>
                                <td>{roomType.room_type_id}</td>
                                <td>{roomType.type_name}</td>
                                <td>{roomType.description}</td>
                                <td>{roomType.amenities}</td>
                                <td>{roomType.capacity}</td>
                                <td>{roomType.price}</td>
                                <td>{roomType.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {roomType.image_url ? (
                                        <img src={roomType.image_url} alt={roomType.type_name} style={{ width: '50px', height: '50px' }} />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleAddOrEdit(roomType)} className="btn btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(roomType.room_type_id)} className="btn btn-delete">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No room types found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Popup Form for Adding/Editing Room Type */}
            {showForm && (
                <div className="popup-form">
                    <h2>{currentRoomType ? 'Edit Room Type' : 'Add Room Type'}</h2>
                    <form>
                        {/* Your form fields here */}
                        <label>
                            Room Type Name:
                            <input type="text" defaultValue={currentRoomType ? currentRoomType.type_name : ''} />
                        </label>
                        <label>
                            Description:
                            <input type="text" defaultValue={currentRoomType ? currentRoomType.description : ''} />
                        </label>
                        <label>
                            Amenities:
                            <input type="text" defaultValue={currentRoomType ? currentRoomType.amenities : ''} />
                        </label>
                        <label>
                            Capacity:
                            <input type="number" defaultValue={currentRoomType ? currentRoomType.capacity : ''} />
                        </label>
                        <label>
                            Price:
                            <input type="number" defaultValue={currentRoomType ? currentRoomType.price : ''} />
                        </label>
                        <label>
                            Status:
                            <select defaultValue={currentRoomType ? (currentRoomType.status ? 'Active' : 'Inactive') : 'Active'}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </label>
                        <label>
                            Image URL:
                            <input type="text" defaultValue={currentRoomType ? currentRoomType.image_url : ''} />
                        </label>
                        <button type="submit" className="btn btn-submit">Save</button>
                        <button type="button" onClick={handleCloseForm} className="btn btn-cancel">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RoomTypeList;
