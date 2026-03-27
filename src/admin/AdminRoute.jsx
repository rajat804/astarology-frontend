import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check for admin token in both localStorage and sessionStorage
  const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
  
  if (!adminToken || !admin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default AdminRoute;