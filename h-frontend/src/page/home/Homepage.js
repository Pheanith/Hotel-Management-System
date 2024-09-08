import React from 'react';

const HomePage = () => {
  const dashboardContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  };

  const headerStyle = {
    color: '#2c3e50',
    marginBottom: '40px',
  };

  const statsContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: '40px',
  };

  const statsBox = {
    width: '200px',
    height: '150px',
    backgroundColor: '#3498db',
    borderRadius: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const actionContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
  };

  const actionButton = {
    width: '200px',
    height: '50px',
    backgroundColor: '#2ecc71',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <div style={dashboardContainer}>
      <h1 style={headerStyle}>Admin Dashboard - Hotel Management System</h1>

      {/* Statistics Section */}
      <div style={statsContainer}>
        <div style={statsBox}>
          <h2>120</h2>
          <p>Total Bookings</p>
        </div>
        <div style={statsBox}>
          <h2>50</h2>
          <p>Available Rooms</p>
        </div>
        <div style={statsBox}>
          <h2>200</h2>
          <p>Total Customers</p>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div style={actionContainer}>
        <button style={actionButton}>Manage Rooms</button>
        <button style={actionButton}>Manage Bookings</button>
        <button style={actionButton}>Manage Customers</button>
      </div>
    </div>
  );
};

export default HomePage;
