// controllers/dashboardController.js
import db from '../utils/db.js'; // Adjust this import based on your actual database connection file

export const getDashboardData = async (req, res) => {
  try {
    // Example queries; adjust according to your actual database structure
    const totalReservationsQuery = 'SELECT COUNT(*) as total FROM reservations'; // Adjust the query
    const totalRevenueQuery = `
      SELECT SUM(r.price_per_night) AS totalRevenue 
      FROM reservation_details AS rd
      JOIN reservations AS res ON rd.reservation_id = res.reservation_id
      JOIN rooms AS r ON rd.room_id = r.room_id;
    `;
    const totalAvailableRoomsQuery = 'SELECT COUNT(*) as total FROM rooms WHERE availability_status = "Available"'; // Adjust the query
    const totalOccupiedRoomsQuery = 'SELECT COUNT(*) as total FROM rooms WHERE availability_status = "Occupied"'; // Adjust the query

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
