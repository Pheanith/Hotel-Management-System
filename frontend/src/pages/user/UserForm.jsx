import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css'; // Ensure styles align with the image's appearance

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfJoin, setDateOfJoin] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admins');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/admins', {
                role,
                username,
                password,
                date_of_join: dateOfJoin
            });
            setUsers([...users, response.data]); // Add new user to the list
            setRole('');
            setUsername('');
            setPassword('');
            setDateOfJoin('');
        } catch (error) {
            setError('Error adding user. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admins/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError('Error deleting user. Please try again.');
        }
    };

    return (
        <div className="user-form-container">
            <h2>Manage Users</h2>
            <input type="text" placeholder="Search..." className="search-input" />

            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Date of Join</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.role}</td>
                            <td>{user.username}</td>
                            <td>******</td> {/* Masked password */}
                            <td>{user.date_of_join}</td>
                            <td>
                                <button className="edit-button">Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="date"
                    placeholder="Date of Join"
                    value={dateOfJoin}
                    onChange={(e) => setDateOfJoin(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add User'}
                </button>
            </form>
        </div>
    );
};

export default UserForm;
