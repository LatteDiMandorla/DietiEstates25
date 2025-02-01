// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  element: JSX.Element;
  roleRequired: string; // Ruolo necessario per accedere
  redirectTo?: string;   // Dove reindirizzare se non autorizzato
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roleRequired, redirectTo = "/login" }) => {
  const { auth } = useAuth();

  // Controlla se l'utente ha il ruolo richiesto
  if (auth && auth.role && auth.role !== roleRequired) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default ProtectedRoute;