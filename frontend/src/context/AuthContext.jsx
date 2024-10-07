// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // Store token
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove the token from localStorage
    };

    // Check if the user is authenticated
    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
