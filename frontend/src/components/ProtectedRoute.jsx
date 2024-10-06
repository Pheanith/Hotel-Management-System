import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path if necessary

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the current user from AuthContext

  // If there is no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, return the children components
  return children;
};

export default ProtectedRoute;
