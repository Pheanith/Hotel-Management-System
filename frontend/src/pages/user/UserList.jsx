// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';  // Import your custom CSS

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admins')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch users');
                setLoading(false);
            });
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admins/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Update state after deletion
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <Link to="/add-user">
                <button className="add-btn">Add New User</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Date of Join</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role || 'N/A'}</td>
                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/edit-user/${user.id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
