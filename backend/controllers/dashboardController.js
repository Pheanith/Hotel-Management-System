// controllers/dashboardController.js
import db from '../utils/db.js'; // Adjust this import based on your actual database connection file

export const getDashboardData = async (req, res) => {
  try {
    // Example queries; adjust according to your actual database structure
    const totalReservationsQuery = 'SELECT COUNT(*) as total FROM reservations'; // Adjust the query
    const totalRevenueQuery = 'SELECT SUM(amount) as totalRevenue FROM reservations'; // Adjust the query
    const totalAvailableRoomsQuery = 'SELECT COUNT(*) as total FROM rooms WHERE is_available = 1'; // Adjust the query
    const totalOccupiedRoomsQuery = 'SELECT COUNT(*) as total FROM rooms WHERE is_available = 0'; // Adjust the query

    const totalReservations = await db.query(totalReservationsQuery);
    const totalRevenue = await db.query(totalRevenueQuery);
    const totalAvailableRooms = await db.query(totalAvailableRoomsQuery);
    const totalOccupiedRooms = await db.query(totalOccupiedRoomsQuery);

    res.json({
      totalReservations: totalReservations[0].total, // Adjust if necessary based on your database query response
      totalRevenue: totalRevenue[0].totalRevenue || 0,
      totalAvailableRooms: totalAvailableRooms[0].total,
      totalOccupiedRooms: totalOccupiedRooms[0].total,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
