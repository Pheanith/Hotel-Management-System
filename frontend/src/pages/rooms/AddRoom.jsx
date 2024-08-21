import React from "react";
import { useState } from "react";
import '../../components/styles/rooms/AddRoom.css';
import { useLocation, useNavigate } from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const AddRoom = ({onclose}) => {
    const location = useLocation();
    const navigate = useNavigate ();
    const {fromPage} = location.state || {};

    const [formData, setFormData] = useState ({
        building: '',
        acomadationType: '',
        roomType: '',
        floorNumber: '',
        roomNumber: '',
        price: '',
        status: '',
        description: '',
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault ();
        navigate('/room-list');
    };

    const handleClose = () => {
        navigate ('/room-list');
    };

    return (
        <div className="addroom-main">
            <div className="addroom-header">
                <h2> Add New Room</h2>
                <ClearOutlinedIcon onClick={handleClose} className='close-icon' />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="addroom-form-group">
                    <div className="row1">
                        <input
                            type = "text"  
                            name = "building"
                            placeholder="Building"
                            value = {formData.building}
                            onChange={handleChange}
                        />
                        <select
                            name= 'acomadationType'
                            value= {formData.acomadationType}
                            onChange={handleChange}>
                                <option value= ""> Please select acomadation type </option>
                                <option value= "hotel room"> Hotel room </option>
                                <option value="home stay"> Home stay </option>
                        </select>
                        <select
                            name='roomType'
                            value={formData.roomType}
                            onChange={handleChange}>
                            <option value="">Please select room type</option>
                            <option value="Single Room">Single Room</option>
                            <option value="Double Room">Double Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="King Room">King Room</option>
                            <option value="Queen Room">Queen Room</option>
                        </select>
                    </div>
                    <div className="row2">
                        <select
                            name = 'floorNumber'
                            value = {formData.floorNumber}
                            onChange = {handleChange}>
                            <option value = ""> Please select floor No.</option>
                            <option value = "1st"> 1st floor</option>
                        </select>
                        <select>
                            <option value = ""> Please select room number </option>
                            <optioon value = "101 "> 101 </optioon>
                        </select>
                    </div>
                    <div className="row3"> 
                        <input
                            type = "text"
                            name = "price"
                            placeholder="$"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <select
                            name = 'status'
                            value={formData.status}
                            onChange={handleChange}>
                            <option value = ""> Please select room status </option>
                            <option value = "available"> Available </option>
                            <option value = "unavailable"> Unavailable </option>
                            <option value = "in-maintenent"> In maintenent </option>
                        </select>
                    </div>
                    <div className="row4">
                        <input
                            type = "text "
                            name = "description"
                            placeholder=" Room description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="submit-room">
                    <button type = "submit"> Submit </button>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;