import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../sidebar/sidebar.css';
import Home from "@mui/icons-material/HomeOutlined";
import Guest from "@mui/icons-material/PeopleAltOutlined";
import Room from "@mui/icons-material/HotelOutlined";
import RoomList from '@mui/icons-material/BallotOutlined';
import ManageUser from '@mui/icons-material/GroupOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Reservations from '@mui/icons-material/BrowserUpdatedOutlined';
// import Transaction from '@mui/icons-material/DiamondOutlined';
// import Invoices from '@mui/icons-material/ReceiptOutlined';
// import PeriodicPrice from '@mui/icons-material/PriceChangeOutlined';
// import Report from '@mui/icons-material/AssessmentOutlined';
// import AgencyCurrency from '@mui/icons-material/CurrencyExchangeOutlined';
// import Tools from '@mui/icons-material/HomeRepairServiceOutlined';
// import Helps from '@mui/icons-material/FavoriteBorderOutlined';
// import YourItems from '@mui/icons-material/CategoryOutlined';
// import MonthlyView from '@mui/icons-material/TodayOutlined';
const Sidebar = () => {
  const location = useLocation();
  const [isRoomListOpen, setRoomListOpen] = useState(false);

  const toggleRoomListDropdown = (event) => {
    event.stopPropagation();
    setRoomListOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isRoomListOpen && !event.target.closest('.dropdown-container')) {
        setRoomListOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isRoomListOpen]);

  return (
    <aside className="sidebar">
      <div className={`dashboard ${location.pathname === '/admin-dashboard' ? 'active' : ''}`}>
        <Home />
        <div className="dashboard-name">
          <Link to='/admin-dashboard'>Admin Dashboard</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/manage-guest' ? 'active' : ''}`}>
        <Guest />
        <div className="dashboard-name">
          <Link to='/manage-guest'>Manage Guest</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/available-room' ? 'active' : ''}`}>
        <Room />
        <div className="dashboard-name">
          <Link to='/available-room'>Available Rooms</Link>
        </div>
      </div>
      
      {/* Room List with Dropdown */}
      <div className={`dashboard ${location.pathname.startsWith('/room-list') ? 'active' : ''}`}>
        <div className="dropdown-container">
          <div className="dropdown-toggle" onClick={toggleRoomListDropdown}>
            <RoomList />
            <span className="dashboard-name">Manage Rooms</span>
            <ExpandMoreIcon className={`dropdown-icon ${isRoomListOpen ? 'open' : ''}`} />
          </div>
          {isRoomListOpen && (
            <div className="dropdown-menu">
              <Link to="/room-list" className="dropdown-item">Room List</Link>
              {/* <Link to="/add-room" className="dropdown-item">Add Room</Link> */}
              {/* <Link to="/edit-room" className="dropdown-item">Edit Room</Link> */}
              <Link to="/room-types" className="dropdown-item">Room Types</Link>
              <Link to="/accommodation-types" className="dropdown-item">Accommodation Types</Link>
              {/* <Link to="/room-features/:id" className="dropdown-item">RoomFeatures</Link> */}

              {/* <Link to="/available" className="dropdown-item">Available</Link> */}
            </div>
          )}
        </div>
      </div>

      <div className={`dashboard ${location.pathname === '/manage-user' ? 'active' : ''}`}>
        <ManageUser />
        <div className="dashboard-name">
          <Link to='/UserList'>Manage User</Link>
        </div>
      </div>
      {/* <div className={`dashboard ${location.pathname === '/reservation' ? 'active' : ''}`}>
        <Reservations />
        <div className="dashboard-name">
          <Link to='/reservation'>Reservations</Link>
        </div>
      </div> */}

      {/* <div className={`dashboard ${location.pathname === '/transaction' ? 'active' : ''}`}>
        <Transaction />
        <div className="dashboard-name">
          <Link to='/transaction'>Transaction</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/invoice' ? 'active' : ''}`}>
        <Invoices />
        <div className="dashboard-name">
          <Link to='/invoice'>Invoices</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/periodic-price' ? 'active' : ''}`}>
        <PeriodicPrice />
        <div className="dashboard-name">
          <Link to='/periodic-price'>Periodic Price</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/report' ? 'active' : ''}`}>
        <Report />
        <div className="dashboard-name">
          <Link to='/report'>Report</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/agency-currency' ? 'active' : ''}`}>
        <AgencyCurrency />
        <div className="dashboard-name">
          <Link to='/agency-currency'>Agency Currency</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/tools' ? 'active' : ''}`}>
        <Tools />
        <div className="dashboard-name">
          <Link to='/tools'>Tools</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/helps' ? 'active' : ''}`}>
        <Helps />
        <div className="dashboard-name">
          <Link to='/helps'>Helps</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/your-items' ? 'active' : ''}`}>
        <YourItems />
        <div className="dashboard-name">
          <Link to='/your-items'>Your Items</Link>
        </div>
      </div>
      <div className={`dashboard ${location.pathname === '/monthly-view' ? 'active' : ''}`}>
        <MonthlyView />
        <div className="dashboard-name">
          <Link to='/monthly-view'>Monthly View</Link>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
