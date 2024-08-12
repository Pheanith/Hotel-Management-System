// src/Sidebar.js
import React, { useRoute } from 'react';
import '../sidebar/sidebar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "@mui/icons-material/HomeOutlined";
import Guest from "@mui/icons-material/PeopleAltOutlined";
import Room from "@mui/icons-material/HotelOutlined";
import Reservations from '@mui/icons-material/BrowserUpdatedOutlined';
import Transaction from '@mui/icons-material/DiamondOutlined';
import Invoices from '@mui/icons-material/ReceiptOutlined';
import PeriodicPrice from '@mui/icons-material/PriceChangeOutlined';
import Report from '@mui/icons-material/AssessmentOutlined';
import AgencyCurrency from '@mui/icons-material/CurrencyExchangeOutlined';
import Tools from '@mui/icons-material/HomeRepairServiceOutlined';
import Helps from '@mui/icons-material/FavoriteBorderOutlined';
import YourItems from '@mui/icons-material/CategoryOutlined';
import MonthlyView from '@mui/icons-material/TodayOutlined';

//import component
import AdminDashboard from '../../pages/admin/AdminDashbaord';
import Reservation from '../../pages/Reservation';

const Sidebar = () => {
  // const [activeContent, setActiveContent] = useState ('home');
  return (
    <aside className="sidebar">
      <div className="dashboard">
        <Home/>
        <div className="dashboard-name">
          <Link to = 'admin-dashboard' style={{ textDecoration: 'none', border: 'none', color: 'black' }}> Admin Dashboard </Link>
        </div>
      </div>
      <div className="dashboard">
        <Guest/>
        <div class="dashboard-name">
          <a> Manage Guest</a>
        </div>
      </div>
      <div className="dashboard">
        <Room/>
        <div class="dashboard-name">
          <a> Manage Room</a>
        </div>
      </div>
      <div className="dashboard">
        <Reservations/>
        <div class="dashboard-name">
          <Link to = 'reservation' style={{ textDecoration: 'none', border: 'none', color: 'black' }}> Reservations </Link>
        </div>
      </div>
      <div className="dashboard">
        <Transaction/>
        <div class="dashboard-name">
          <a> Transactions </a>
        </div>
      </div>
      <div className="dashboard">
        <Invoices/>
        <div class="dashboard-name">
          <a> Invoices </a>
        </div>
      </div>
      <div className="dashboard">
        <PeriodicPrice/>
        <div class="dashboard-name">
          <a> Periodic Price </a>
        </div>
      </div>
      <div className="dashboard">
        <Report/>
        <div class="dashboard-name">
          <a> Report </a>
        </div>
      </div>
      <div className="dashboard">
        <AgencyCurrency/>
        <div class="dashboard-name">
          <a> Agency Currency </a>
        </div>
      </div>
      <div className="dashboard">
        <Tools/>
        <div class="dashboard-name">
          <a> Agency Currency </a>
        </div>
      </div>
      <div className="dashboard">
        <Helps/>
        <div class="dashboard-name">
          <a> Helps </a>
        </div>
      </div>
      <div className="dashboard">
        <YourItems/>
        <div class="dashboard-name">
          <a> Your Items </a>
        </div>
      </div>
      <div className="dashboard">
        <MonthlyView/>
        <div class="dashboard-name">
          <a> Monthly View </a>
        </div>
      </div>

      {/* define route */}
      {/* <Routes>
        <Route path='../../pages/admin/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='../../pages/Reservation' element={<Reservation/>}/>
      </Routes> */}

    </aside>
  )
};

export default Sidebar;
