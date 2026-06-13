import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import type { AdminStats } from '../types';
import { 
  FaUsers, 
  FaStore, 
  FaShoppingCart, 
  FaDollarSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: FaUsers,
      color: 'bg-blue-500',
      change: `${(stats?.usersChange ?? 0) > 0 ? '+' : ''}${(stats?.usersChange ?? 0).toFixed(1)}%`,
      changeUp: (stats?.usersChange ?? 0) >= 0,
    },
    {
      title: 'Total Restaurants',
      value: stats?.totalRestaurants || 0,
      icon: FaStore,
      color: 'bg-green-500',
      change: `${(stats?.restaurantsChange ?? 0) > 0 ? '+' : ''}${(stats?.restaurantsChange ?? 0).toFixed(1)}%`,
      changeUp: (stats?.restaurantsChange ?? 0) >= 0,
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: FaShoppingCart,
      color: 'bg-purple-500',
      change: `${(stats?.ordersChange ?? 0) > 0 ? '+' : ''}${(stats?.ordersChange ?? 0).toFixed(1)}%`,
      changeUp: (stats?.ordersChange ?? 0) >= 0,
    },
    {
      title: 'Total Revenue',
      value: `₹${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: FaDollarSign,
      color: 'bg-orange-500',
      change: `${(stats?.revenueChange ?? 0) > 0 ? '+' : ''}${(stats?.revenueChange ?? 0).toFixed(1)}%`,
      changeUp: (stats?.revenueChange ?? 0) >= 0,
    },
  ];

  const orderStats = [
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: FaClock,
      color: 'bg-orange-500',
    },
    {
      title: 'Active Orders',
      value: stats?.activeOrders || 0,
      icon: FaClock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Delivered Orders',
      value: stats?.deliveredOrders || 0,
      icon: FaCheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Cancelled Orders',
      value: stats?.cancelledOrders || 0,
      icon: FaTimesCircle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                  <div className="flex items-center mt-2">
                    {card.changeUp ? (
                      <FaArrowUp className="text-green-500 mr-1" />
                    ) : (
                      <FaArrowDown className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${card.changeUp ? 'text-green-500' : 'text-red-500'}`}>
                      {card.change}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">from last month</span>
                  </div>
                </div>
                <div className={`${card.color} p-4 rounded-full`}>
                  <Icon className="text-white text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Today's Orders</h3>
          <p className="text-4xl font-bold">{stats?.todayOrders || 0}</p>
          <p className="text-orange-100 mt-2">Orders placed today</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Today's Revenue</h3>
          <p className="text-4xl font-bold">₹{stats?.todayRevenue?.toLocaleString() || 0}</p>
          <p className="text-green-100 mt-2">Revenue generated today</p>
        </div>
      </div>

      {/* Order Status Stats */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <Icon className="text-white text-2xl" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
