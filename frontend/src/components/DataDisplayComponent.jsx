import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const DataDisplayComponent = () => {
    const { token } = useAuth(); // Get the token from context
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('API_ENDPOINT_HERE', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token for protected routes
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result); // Log the result
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]); // Depend on the token

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {data.map(item => (
                <li key={item.room_id}>
                    {item.room_number} - {item.room_type_name} - {item.availability_status}
                </li>
            ))}
        </ul>
    );
};

export default DataDisplayComponent;
