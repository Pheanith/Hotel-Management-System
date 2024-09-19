import React from 'react';
import './AuthLayout.css'; // Create this file for AuthLayout specific styles

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
