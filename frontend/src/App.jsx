import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Reservation from './pages/Reservation';
import AdminDashbaord from './pages/admin/AdminDashbaord';
import Invoice from './pages/invoice/Invoice';
import Room from './pages/rooms/Room';
import RoomList from './pages/rooms/RoomList';
import Transaction from './pages/Transaction';
import Reservationform from './pages/Reservationform';
import AddRoom from './pages/rooms/AddRoom';
import Guest from './pages/guests/Guest';
import RoomEdit from './pages/rooms/RoomEdit';
import ReservationEdit from './pages/ReservationEdit';
import GuestForm from './pages/guests/GuestForm';
import GuestReserve from './pages/guests/GuestReserve';
import Register from './pages/Login&Rgister/Register';
import Login from './pages/Login&Rgister/Login';
import AuthLayout from './layouts/AuthLayout';
import './App.css';

// Main layout component with header and sidebar
function MainLayout({ children }) {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}

// App component with routing
function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with main layout */}
        <Route path="/" element={<MainLayout><AdminDashbaord /></MainLayout>} />
        <Route path="admin-dashboard" element={<MainLayout><AdminDashbaord /></MainLayout>} />
        <Route path="reservation" element={<MainLayout><Reservation /></MainLayout>} />
        <Route path="invoice" element={<MainLayout><Invoice /></MainLayout>} />
        <Route path="available-room" element={<MainLayout><Room /></MainLayout>} />
        <Route path="transaction" element={<MainLayout><Transaction /></MainLayout>} />
        <Route path="reserve" element={<MainLayout><Reservationform /></MainLayout>} />
        <Route path="manage-guest" element={<MainLayout><Guest /></MainLayout>} />
        <Route path="room-list" element={<MainLayout><RoomList /></MainLayout>} />
        <Route path="add-room" element={<MainLayout><AddRoom /></MainLayout>} />
        <Route path="edit-room/:id" element={<MainLayout><RoomEdit /></MainLayout>} />
        <Route path="edit-reservation/:id" element={<MainLayout><ReservationEdit /></MainLayout>} />
        <Route path="add-new-guest" element={<MainLayout><GuestForm /></MainLayout>} />
        <Route path="select-guest" element={<MainLayout><GuestReserve /></MainLayout>} />

        {/* Routes with auth layout */}
        <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="login" element={<AuthLayout><Login /></AuthLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
