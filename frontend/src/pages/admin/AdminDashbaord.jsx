import React from 'react';
import '../../components/styles/AdminDashboard.css';
import Reserve from '../../components/assets/img/reserve.png';
import Bed from '../../components/assets/img/beds.png';
import Transactions from '../../components/assets/img/transaction.png';

const Card = ({ icon, title, count }) => {
  return (
    <div className="dashboard-card">
      {icon && (
        <div className="dashboard-card-icon">
          <img src={icon} alt={`${title} Icon`} />
        </div>
      )}
      <div className="dashboard-card-details">
        <div className="dashboard-card-title">
          {title}
        </div>
        <div className="dashboard-card-count">
          {count}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-main-content">
      <div className="admin-content-header">
        <span>Dashboard</span>
      </div>

      <div className="dashboard-cards-container">
        {/* <Card
          icon={Reserve}
          title="Total Bookings"
          count={57}
        /> */}
        <Card
          icon={Bed}
          title="Total Reservations"
          count={1004}
        />
        <Card
          icon={Transactions}
          title="Total Revenue"
          count={1004}
        />
        <Card
          title="Total Occupied Rooms"
          count={300}
        />
        <Card
           
          title="Available Rooms Today"
          count={45}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
