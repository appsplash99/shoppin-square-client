import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getLocalCredentials } from '../../utils/localStorage';

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = getLocalCredentials();

  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
