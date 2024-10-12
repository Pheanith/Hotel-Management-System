import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Assuming axios is used for API calls
import './AccommodationTypes.css'; // Assuming you have a similar CSS file like RoomType for styling

const AccommodationTypes = () => {
    const [accommodationTypes, setAccommodationTypes] = useState([]);

    useEffect(() => {
        // Fetching the accommodation types from your API
        axios.get('http://localhost:5000/api/accommodation_types') // Adjust this URL based on your API
            .then(response => {
                setAccommodationTypes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the accommodation types!', error);
            });
    }, []);

    return (
        <div className="accommodation-types-container">
            <h1>Accommodation Types</h1>
            <table className="accommodation-table">
                <thead>
                    <tr>
                        <th>Accommodation Type ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {accommodationTypes.map((type, index) => (
                        <tr key={index}>
                            <td>{type.accommodation_type_id}</td>
                            <td>{type.name}</td>
                            <td>{type.description}</td>
                            <td>{new Date(type.created_at).toLocaleDateString()}</td>
                            <td>{new Date(type.updated_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccommodationTypes;
