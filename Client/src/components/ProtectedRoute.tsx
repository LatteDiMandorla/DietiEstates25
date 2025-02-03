// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  element: JSX.Element;
  roleRequired: string[]; // Ruolo necessario per accedere
  redirectTo?: string;   // Dove reindirizzare se non autorizzato
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roleRequired}) => {
  const { auth } = useAuth();

  return (auth && auth.ruolo && roleRequired.includes(auth.ruolo)) ? element : null;
};

export default ProtectedRoute;