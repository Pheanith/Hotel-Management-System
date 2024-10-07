// src/components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { token } = useAuth(); // Use the token from AuthContext

    // Check if the token exists to determine if the user is authenticated
    const isAuthenticated = Boolean(token);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
