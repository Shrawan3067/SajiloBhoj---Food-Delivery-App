import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import type { AdminStats } from '../types';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Analytics: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [analytics, setAnalytics] = useState<{ revenueData: Array<{ name: string; revenue: number }>; ordersData: Array<{ name: string; orders: number }> } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, analyticsData] = await Promise.all([
          adminService.getStats(),
          adminService.getAnalytics()
        ]);
        setStats(statsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const revenueData = analytics?.revenueData || [];
  const ordersData = analytics?.ordersData || [];

  const orderStatusData = [
    { name: 'Delivered', value: stats?.deliveredOrders || 0, color: '#10B981' },
    { name: 'Pending', value: stats?.pendingOrders || 0, color: '#F59E0B' },
    { name: 'Cancelled', value: stats?.cancelledOrders || 0, color: '#EF4444' },
    { name: 'Active', value: stats?.activeOrders || 0, color: '#3B82F6' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics & Reports</h1>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Orders</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Average Order Value</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{stats?.totalRevenue && stats?.totalOrders ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Delivery Success Rate</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.totalOrders && stats?.deliveredOrders 
                    ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Cancellation Rate</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.totalOrders && stats?.cancelledOrders 
                    ? Math.round((stats.cancelledOrders / stats.totalOrders) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Orders per Restaurant</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats?.totalOrders && stats?.totalRestaurants 
                    ? Math.round(stats.totalOrders / stats.totalRestaurants) 
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
