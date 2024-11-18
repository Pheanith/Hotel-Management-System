//Geust.jsx
import React, {useState} from "react";
import '../../components/styles/guest/Guest.css';
import GuestTable from './GuestTable.jsx';
import Search from '@mui/icons-material/SearchOutlined.js';
import GuestForm from './GuestForm.jsx';
import { useNavigate } from "react-router-dom";

const Guest = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const navigate = useNavigate ();
    const handleCloseForm = () => {
        setFormVisible (false);
    };

    const handleOpenForm = () => {
        navigate ('/add-new-guest', {state: { fromPage: 'guest' } } );
    };
    return (
        <div className="guest-main-content">
            <div className="guest-content-header">
                <a> Guests List </a>
                <div className="guest-search-bar">
                    <Search/>
                    <div className="guest-search-bar1">
                        <input type = "text" placeholder="Search"/>
                        <button onClick={handleOpenForm}> New Guest </button>
                    </div>
                </div>
            </div>
            {isFormVisible ? (
                <GuestForm onclose = {handleCloseForm}/>
            ) : (
                <GuestTable/>
            )}
        </div>
    );
};
export default Guest;

