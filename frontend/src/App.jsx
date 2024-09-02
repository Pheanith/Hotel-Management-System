// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Reservation from './pages/Reservation';
import AdminDashbaord from './pages/admin/AdminDashbaord';
import Invoice from './pages/Invoice';
import Room from './pages/rooms/Room';
import RoomList from './pages/rooms/RoomList';
import Transaction from './pages/Transaction';
import Reservationform from './pages/Reservationform';
import AddRoom from './pages/rooms/AddRoom';
// import Login from './pages/Login&Rgister/Login';
import Guest from './pages/guests/Guest';
import RoomEdit from './pages/rooms/RoomEdit';
import ReservationEdit from './pages/ReservationEdit';
import GuestForm from './pages/guests/GuestForm';
import './App.css';

function App() {
  // const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path= '/' element = {<AdminDashbaord/>} /> {/* Defualt path*/}
              <Route path="admin-dashboard" element={<AdminDashbaord />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="invoice" element={<Invoice/>}/>
              <Route path="available-room" element={<Room/>}/>
              <Route path="transaction" element={<Transaction/>}/>
              <Route path="reserve" element={<Reservationform />} /> {/* Add this line */}
              <Route path="manage-guest" element={<Guest/>}/>
              <Route path= "room-list" element={<RoomList/>}/>
              <Route path= "add-room" element={<AddRoom/>}/>
              <Route path = "edit-room/:id" element= {<RoomEdit/>}/> 
              <Route path = "edit-resservation/:id" element={<ReservationEdit/>}/>
              <Route path= "add-new-guest" element = {<GuestForm/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
