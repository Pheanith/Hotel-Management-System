// src/pages/user/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Make sure this is the correct path for your CSS file

const ProfilePage = () => {
  // Example user data (this could come from an API)
  const [user, setUser] = useState({
    username: 'UN SENGLY',
    email: 'un.sengly@gmail.com',
    profilePicture: 'https://via.placeholder.com/150',
    role: 'Admin',
    createdAt: '2024-01-01',
  });

  useEffect(() => {
    // Fetch user data from an API or other source here
    // setUser(fetchedUserData);
  }, []);

  // Handle edit profile action
  const handleEdit = () => {
    // Logic for editing the profile (e.g., open a modal or redirect to edit page)
    console.log("Edit profile clicked");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-image"
        />
        <h2>{user.username}</h2>
        <p>{user.role}</p>
      </div>
      <div className="profile-details">
        <div className="profile-detail">
          <strong>Email:</strong>
          <p>{user.email}</p>
        </div>
        <div className="profile-detail">
          <strong>Joined On:</strong>
          <p>{user.createdAt}</p>
        </div>
      </div>
      {/* Edit Profile Button */}
      <button className="edit-profile-btn" onClick={handleEdit}>
        Edit Profile
      </button>
    </div>
  );
};

export default ProfilePage;
