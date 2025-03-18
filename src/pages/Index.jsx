
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  switch (user?.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'client':
      return <Navigate to="/client/dashboard" replace />;
    case 'employee':
      return <Navigate to="/employee/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default Index;
