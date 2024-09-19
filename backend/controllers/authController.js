import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // For generating tokens, if needed
import { findAdminByUsername } from '../models/authModel.js';

// Function to compare passwords
const comparePasswords = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Admin login
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await findAdminByUsername(username);
        if (admin) {
            const isMatch = await comparePasswords(password, admin.password);
            if (isMatch) {
                const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
