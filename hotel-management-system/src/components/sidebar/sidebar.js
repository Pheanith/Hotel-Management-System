// src/Sidebar.js
import React from 'react';
import '../sidebar/sidebar.css';
import Home from "@mui/icons-material/HomeOutlined";
import Guest from "@mui/icons-material/PeopleAltOutlined";
import Room from "@mui/icons-material/HotelOutlined";
import Reservation from '@mui/icons-material/BrowserUpdatedOutlined';
import Transaction from '@mui/icons-material/DiamondOutlined';
import Invoices from '@mui/icons-material/ReceiptOutlined';
import PeriodicPrice from '@mui/icons-material/PriceChangeOutlined';
import Report from '@mui/icons-material/AssessmentOutlined';
import AgencyCurrency from '@mui/icons-material/CurrencyExchangeOutlined';
import Tools from '@mui/icons-material/HomeRepairServiceOutlined';
import Helps from '@mui/icons-material/FavoriteBorderOutlined';
import YourItems from '@mui/icons-material/CategoryOutlined';
import MonthlyView from '@mui/icons-material/TodayOutlined';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="dashboard">
        <Home/>
        <div className="dashboard-name">
          <a> Admin Dashboard</a>
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
      <div className="reservation">
        <Reservation/>
        <div class="dashboard-name">
          <a> Reservations </a>
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
    </aside>
  )
};

export default Sidebar;
