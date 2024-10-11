import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import './UserList.css'; // Ensure this CSS file exists

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Redirect to the edit page
  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`); // Navigate to the edit-user route with user ID
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admins/${userId}`);
        setUsers(users.filter(user => user.id !== userId)); // Update state to remove the deleted user
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-user-list-content">
      <h2>User List</h2>

      <div className="user-list-header">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search by username..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <Link to="/add-user" className="add-user-btn">
          <FaUserPlus /> + Add User
        </Link>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="action-btn">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn" style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList; // Ensure you export the component
