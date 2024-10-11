import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'Admin', // Default role, change according to your logic
    is_active: true, // Default active status
  });
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admins/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admins/${id}`, user);
      alert('User updated successfully!');
      navigate('/UserList'); // Redirect to the user list after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password (leave blank to keep unchanged):</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Simple Admin">Staff</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="is_active"
              checked={user.is_active}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <button type="submit" className="submit-btn">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
