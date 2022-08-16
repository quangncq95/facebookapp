import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useFBAuth from '../hooks/useFBAuth';
// pages
import Login from '../pages/Login'
// components

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useFBAuth();

  if (!isInitialized) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}
