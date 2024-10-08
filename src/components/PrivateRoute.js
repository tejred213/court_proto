import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component checks if user is authenticated
const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // Check if user is authenticated
  return authToken ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
