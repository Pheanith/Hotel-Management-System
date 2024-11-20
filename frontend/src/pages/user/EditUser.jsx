// EditUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditUser = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admins/${userId}`)
            .then(response => {
                const { username, role } = response.data;
                setUsername(username);
                setRole(role);
            })
            .catch(error => {
                setError('Failed to fetch user');
            });
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !role) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/admins/${userId}`, { username, role });
            history.push('/');  // Redirect after updating user
        } catch (error) {
            setError('Failed to update user');
        }
    };

    return (
        <div className="form-container">
            <h2>Edit User</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Admin">Admin</option>
                        <option value="Simple Admin">Simple Admin</option>
                    </select>
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
