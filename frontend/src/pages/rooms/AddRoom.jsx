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
                            <option value="">Please select</option>
                            <option value="Single Room">Single Room</option>
                            <option value="Double Room">Double Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="King Room">King Room</option>
                            <option value="Queen Room">Queen Room</option>
                        </select>
                    </div>
                    <div className="row2">
                        <input
                            
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddRoom;