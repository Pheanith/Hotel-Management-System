import db from '../utils/db.js';

export const findAdminByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateAdminRefreshToken = async (adminId, refreshToken) => {
  await db.query('UPDATE admins SET refresh_token = ? WHERE id = ?', [refreshToken, adminId]);
};
