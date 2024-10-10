import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserPlus } from 'react-icons/fa'; 
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admins'); // Make sure the endpoint matches the backend
        setUsers(response.data); // Assuming response data is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit logic here (e.g., redirect to edit page)
  };

  const handleCopy = (username) => {
    navigator.clipboard.writeText(username);
    alert(`Username ${username} copied to clipboard!`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${userId}`); // Call the delete API
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-user-list-content">
      <h2>User List</h2>
      
      {/* Search Bar and Add User Button */}
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
        <Link 
          to="/add-user" 
          className="add-user-btn"
        >
          <FaUserPlus /> + Add User
        </Link>
      </div>

      {/* User Table */}
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
                <button onClick={() => handleCopy(user.username)} className="action-btn">Copy</button>
                <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
