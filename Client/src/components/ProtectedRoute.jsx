import React from 'react'; // added: react import
import { Navigate } from 'react-router-dom'; // added: navigation for redirects
import { useAuth } from '../context/AuthContext.jsx'; // added: use auth context

const ProtectedRoute = ({ children }) => { // added: component definition
  const { isAuthenticated, loading } = useAuth(); // added: read auth state
  if (loading) return null; // added: avoid flicker while hydrating
  return isAuthenticated ? children : <Navigate to="/login" replace />; // added: guard logic
};

export default ProtectedRoute; // added: export component


