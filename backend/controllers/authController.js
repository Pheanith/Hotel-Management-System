import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findAdminByUsername, saveRefreshToken } from '../models/authModel.js';
import db from '../utils/db.js';

const saltRounds = 10;

// Registration
export const register = (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: 'Username, password, and role are required' });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // Insert user into the database
        db.query(
            'INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role],
            (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    });
};

// Login
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const admin = await findAdminByUsername(username);
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate Access Token
        const accessToken = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Generate Refresh Token
        const refreshToken = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        // Save refresh token in the database
        await saveRefreshToken(admin.id, refreshToken);

        // Return both tokens
        res.status(200).json({ accessToken, refreshToken });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Refresh Access Token
export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const admin = await findAdminById(decoded.id);  // Use a function to find the admin by id

        if (!admin || admin.refresh_token !== refreshToken) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }

        // Generate new Access Token
        const newAccessToken = jwt.sign(
            { id: admin.id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
};
