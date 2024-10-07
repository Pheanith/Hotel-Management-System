// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AdminDashboard from './pages/admin/AdminDashbaord';
import Reservation from './pages/Reservation';
import Invoice from './pages/invoice/Invoice';
import Room from './pages/rooms/Room';
import RoomList from './pages/rooms/RoomList';
import UserList from './pages/user/UserList';
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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DataDisplayComponent from './components/DataDisplayComponent';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="/data" element={<DataDisplayComponent />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={
              <>
                <Header /> {/* Header for protected pages */}
                <div className="main-layout">
                  <Sidebar /> {/* Sidebar for protected pages */}
                  <main className="content">
                    <Outlet /> {/* Render the child routes here */}
                  </main>
                </div>
              </>
            }>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/available-room" element={<Room />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/reserve" element={<Reservationform />} />
              <Route path="/manage-guest" element={<Guest />} />
              <Route path="/room-list" element={<RoomList />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/edit-room/:id" element={<RoomEdit />} />
              <Route path="/edit-reservation/:id" element={<ReservationEdit />} />
              <Route path="/add-new-guest" element={<GuestForm />} />
              <Route path="/select-guest" element={<GuestReserve />} />
              <Route path="/userlist" element={<UserList />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
