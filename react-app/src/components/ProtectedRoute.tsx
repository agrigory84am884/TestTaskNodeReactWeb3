import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optionally show a loading spinner or nothing while checking auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
