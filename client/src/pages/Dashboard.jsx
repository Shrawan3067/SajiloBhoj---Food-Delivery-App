// client/src/pages/Dashboard.jsx
import React from 'react';
import CustomerHome from './CustomerHome';
import RestaurantDashboard from './RestaurantDashboard';
import AdminPanel from './AdminPanel';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { auth } = useAuth();
  const role = auth?.user?.role;

  if (role === 'restaurant') return <RestaurantDashboard />;
  if (role === 'admin') return <AdminPanel />;
  return <CustomerHome />;
}
