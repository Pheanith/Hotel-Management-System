import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import './UserList.css'; // Ensure this CSS file exists

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [isEdit, setIsEdit] = useState(false); // Determine if editing or creating
  const [formData, setFormData] = useState({ username: '', role: '', password: '' });
  const [editingUserId, setEditingUserId] = useState(null); // ID of user being edited

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

  const handleEdit = (user) => {
    setFormData({ username: user.username, role: user.role, password: '' });
    setEditingUserId(user.id);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admins/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const handleAddUser = () => {
    setFormData({ username: '', role: '', password: '' });
    setIsEdit(false);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/admins/${editingUserId}`, formData);
        setUsers(users.map(user => user.id === editingUserId ? { ...user, ...formData } : user));
        alert('User updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/admins', formData);
        setUsers([...users, response.data]);
        alert('User added successfully!');
      }
      setShowForm(false);
      setFormData({ username: '', role: '', password: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error saving user');
    }
  };

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
        <button onClick={handleAddUser} className="add-user-btn">
          <FaUserPlus /> + Add User
        </button>
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
                <button onClick={() => handleEdit(user)} className="action-btn">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn" style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="user-form-container">
          <h3>{isEdit ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={handleFormSubmit} className="user-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Simple Admin">Staff</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!isEdit}
              />
            </div>
            <button type="submit" className="action-btn">
              {isEdit ? 'Update User' : 'Add User'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
