// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import Reservation from './pages/Reservation';
import AdminDashbaord from './pages/admin/AdminDashbaord';
import Invoice from './pages/Invoice';
import Room from './pages/Room';
import Transaction from './pages/Transaction';
import Reservationform from './pages/Reservationform';
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
              <Route path="admin-dashboard" element={<AdminDashbaord />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="/" element={<AdminDashbaord />} /> Default route
              <Route path="invoice" element={<Invoice/>}/>
              <Route path="manage-room" element={<Room/>}/>
              <Route path="transaction" element={<Transaction/>}/>
              <Route path="reserve" element={<Reservationform />} /> {/* Add this line */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
