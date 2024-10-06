// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests
import Reserve from '../../components/assets/img/reserve.png';
import Bed from '../../components/assets/img/beds.png';
import Transactions from '../../components/assets/img/transaction.png';
import '../../components/styles/AdminDashboard.css';

const Card = ({ icon, title, count }) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-icon">
        <img src={icon} alt={`${title} Icon`} />
      </div>
      <div className="dashboard-card-details">
        <div className="dashboard-card-title">{title}</div>
        <div className="dashboard-card-count">{count}</div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalReservations: 0,
    totalRevenue: 0,
    totalAvailableRooms: 0,
    totalOccupiedRooms: 0
  });

  useEffect(() => {
    // Fetch dashboard data from API
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard-data'); // Ensure the URL matches your backend
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-main-content">
      <div className="admin-content-header">
        <span>Overview</span>
      </div>
      <div className="dashboard-cards-container">
        <Card icon={Reserve} title="Total Reservations" count={dashboardData.totalReservations} />
        <Card icon={Transactions} title="Total Revenue" count={`$${dashboardData.totalRevenue}`} />
        <Card icon={Bed} title="Total Available Rooms" count={dashboardData.totalAvailableRooms} />
        <Card icon={Bed} title="Total Occupied Rooms" count={dashboardData.totalOccupiedRooms} />
      </div>
    </div>
  );
};

export default AdminDashboard;
