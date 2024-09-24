// controllers/dashboardController.js
import db from '../utils/db.js';

export const getDashboardData = async (req, res) => {
  try {
    // Fetch total reservations
    const [reservations] = await db.query('SELECT COUNT(*) as totalReservations FROM reservations');
    
    // Fetch total revenue
    const [revenue] = await db.query('SELECT SUM(amount) as totalRevenue FROM transactions');
    
    // Fetch total available rooms today
    const [availableRooms] = await db.query('SELECT COUNT(*) as totalAvailableRooms FROM rooms WHERE is_available = 1');

    // Fetch total occupied rooms today
    const [occupiedRooms] = await db.query('SELECT COUNT(*) as totalOccupiedRooms FROM rooms WHERE is_available = 0');
    
    res.json({
      totalReservations: reservations[0].totalReservations,
      totalRevenue: revenue[0].totalRevenue,
      totalAvailableRooms: availableRooms[0].totalAvailableRooms,
      totalOccupiedRooms: occupiedRooms[0].totalOccupiedRooms
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
