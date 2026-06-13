import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaThLarge, 
  FaStore, 
  FaShoppingCart, 
  FaUsers, 
  FaUtensils, 
  FaChartBar,
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaThLarge, label: 'Dashboard' },
    { path: '/admin/restaurants', icon: FaStore, label: 'Restaurants' },
    { path: '/admin/orders', icon: FaShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: FaUsers, label: 'Users' },
    { path: '/admin/menu', icon: FaUtensils, label: 'Menu Management' },
    { path: '/admin/analytics', icon: FaChartBar, label: 'Analytics' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white fixed left-0 top-0 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-orange-500">BiteXpress</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
