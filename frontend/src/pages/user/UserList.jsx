// src/pages/user/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Ensure this file exists for styling

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Update this API endpoint accordingly
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement the edit logic (e.g., navigate to edit page)
  };

  const handleCopy = (username) => {
    navigator.clipboard.writeText(username);
    alert(`Username ${username} copied to clipboard!`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Update this endpoint based on your API design
      setUsers(users.filter(user => user.id !== userId)); // Update the user list after deletion
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="main-user-list-content">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Date of Join</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.password_hash}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleCopy(user.username)}>Copy</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
