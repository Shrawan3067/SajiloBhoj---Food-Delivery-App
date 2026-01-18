import React from 'react';
import CustomerHome from './CustomerHome';
import RestaurantDashboard from './RestaurantDashboard';
import AdminPanel from './AdminPanel';
import { useAuth } from '../context/AuthContext';

export default function Dashboard(): JSX.Element {
  const { user } = useAuth() as any;
  const role = user?.role;

  if (role === 'restaurant') return <RestaurantDashboard />;
  if (role === 'admin') return <AdminPanel />;
  return <CustomerHome />;
}
