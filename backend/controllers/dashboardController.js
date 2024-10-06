// controllers/dashboardController.js
import db from '../utils/db.js';  // Ensure this is correct

export const getDashboardData = async (req, res) => {
    try {
        const [reservations] = await db.query('SELECT COUNT(*) as totalReservations FROM reservations');
        const [revenue] = await db.query(`
            SELECT SUM(rooms.price_per_night) as totalRevenue 
            FROM reservation_details 
            JOIN reservations ON reservation_details.reservation_id = reservations.reservation_id 
            JOIN rooms ON reservation_details.room_id = rooms.room_id
        `);
        const [availableRooms] = await db.query('SELECT COUNT(*) as totalAvailableRooms FROM rooms WHERE availability_status = "Available"');
        const [occupiedRooms] = await db.query('SELECT COUNT(*) as totalOccupiedRooms FROM rooms WHERE availability_status = "Occupied"');

        res.json({
            totalReservations: reservations[0].totalReservations,
            totalRevenue: revenue[0].totalRevenue || 0,
            totalAvailableRooms: availableRooms[0].totalAvailableRooms,
            totalOccupiedRooms: occupiedRooms[0].totalOccupiedRooms
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};
