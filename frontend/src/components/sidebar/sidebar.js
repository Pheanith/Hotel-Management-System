import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../sidebar/sidebar.css';
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

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className={`dashboard ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
        <Home/>
        <div className="dashboard-name">
          <Link to='/admin-dashboard'>
            Admin Dashboard
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/manage-guest' ? 'active' : ''}`}>
        <Guest/>
        <div className="dashboard-name">
          <Link to='/manage-guest'>
            Manage Guest
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/available-room' ? 'active' : ''}`}>
        <Room/>
        <div className="dashboard-name">
          <Link to='/available-room'>
            Available Rooms
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/reservation' ? 'active' : ''}`}>
        <Reservations/>
        <div className="dashboard-name">
          <Link to='/reservation'>
            Reservations
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/transaction' ? 'active' : ''}`}>
        <Transaction/>
        <div className="dashboard-name">
          <Link to='/transaction'>
            Transaction
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/invoice' ? 'active' : ''}`}>
        <Invoices/>
        <div className="dashboard-name">
          <Link to='/invoice'>
            Invoices
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/periodic-price' ? 'active' : ''}`}>
        <PeriodicPrice/>
        <div className="dashboard-name">
          <Link to='/periodic-price'>
            Periodic Price
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/report' ? 'active' : ''}`}>
        <Report/>
        <div className="dashboard-name">
          <Link to='/report'>
            Report
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/agency-currency' ? 'active' : ''}`}>
        <AgencyCurrency/>
        <div className="dashboard-name">
          <Link to='/agency-currency'>
            Agency Currency
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/tools' ? 'active' : ''}`}>
        <Tools/>
        <div className="dashboard-name">
          <Link to='/tools'>
            Tools
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/helps' ? 'active' : ''}`}>
        <Helps/>
        <div className="dashboard-name">
          <Link to='/helps'>
            Helps
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/your-items' ? 'active' : ''}`}>
        <YourItems/>
        <div className="dashboard-name">
          <Link to='/your-items'>
            Your Items
          </Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/monthly-view' ? 'active' : ''}`}>
        <MonthlyView/>
        <div className="dashboard-name">
          <Link to='/monthly-view'>
            Monthly View
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
