//roomModel.js
import db from '../utils/db.js';

// Get all rooms
export const getAllRooms = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM rooms', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Get a room by ID
export const getRoomById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM rooms WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// Add a new room
export const addRoom = (room) => {
    const { building, accommodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = room;
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO rooms (building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [building, accommodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description], 
        (err, result) => {
          if (err) {
            console.error('Database error:', err); // Log database error
            return reject(err);
          }
          console.log('Insert result:', result); // Log result for debugging
          if (result && result.insertId !== undefined) {
            resolve(result.insertId);
          } else {
            reject(new Error('Insert result does not contain insertId'));
          }
        }
      );
    });
};
  
  

// Update a room by ID
export const updateRoom = (id, updates) => {
  const { building, accommodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = updates;
  return new Promise((resolve, reject) => {
    db.query('UPDATE rooms SET building = ?, accomadationType = ?, roomType = ?, floorNumber = ?, roomNumber = ?, price = ?, status = ?, availableFrom = ?, availableTo = ?, description = ? WHERE id = ?', 
      [building, accommodationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description, id], 
      (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
  });
};

// Delete a room by ID
export const deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM rooms WHERE id = ?', [id], (err, result) => {
      if (err) reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};
