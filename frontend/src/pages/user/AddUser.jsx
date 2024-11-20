// AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !role) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/admins', { username, password, role });
            history.push('/');  // Redirect to the user list after successful creation
        } catch (err) {
            setError('Failed to create user');
        }
    };

    return (
        <div className="form-container">
            <h2>Add New User</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Simple Admin">Simple Admin</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default AddUser;
