import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleRouteProps {
  allowedRoles?: string[];
  children: ReactNode;
}

export default function RoleRoute({ allowedRoles = [], children }: RoleRouteProps) {
  const { user } = useAuth() as any;
  const role = user?.role;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
}
