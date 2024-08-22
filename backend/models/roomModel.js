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
    const { building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = room;
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO rooms (building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description], 
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result && result.insertId) {
            resolve(result.insertId);
          } else {
            reject(new Error('Unexpected result format from database'));
          }
        });
    });
  };
  

// Update a room by ID
export const updateRoom = (id, updates) => {
  const { building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description } = updates;
  return new Promise((resolve, reject) => {
    db.query('UPDATE rooms SET building = ?, accomadationType = ?, roomType = ?, floorNumber = ?, roomNumber = ?, price = ?, status = ?, availableFrom = ?, availableTo = ?, description = ? WHERE id = ?', 
      [building, accomadationType, roomType, floorNumber, roomNumber, price, status, availableFrom, availableTo, description, id], 
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
