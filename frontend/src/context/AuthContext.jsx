// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) =>  {
       // call backend
        const response = await axios.post("http://localhost:5000/auth/login", {
            username: username,
            password: password,
        });

        console.log(response.data.accessToken);

        const newToken = response.data.accessToken;
        
       
         setToken(newToken); 

        localStorage.setItem('token', newToken);  // Store token
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
