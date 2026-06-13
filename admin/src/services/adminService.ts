import api from './api';
import type { AdminStats, User, Restaurant, Order } from '../types';

export const adminService = {
  // Stats
  getStats: async (): Promise<AdminStats> => {
    const response = await api.get('/api/admin/stats');
    return response.data;
  },

  // Users
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/api/admin/users');
    return response.data;
  },

  // Restaurants
  getAllRestaurants: async (): Promise<Restaurant[]> => {
    const response = await api.get('/api/admin/restaurants');
    return response.data;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/api/admin/orders');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/api/admin/analytics');
    return response.data;
  },

  createRestaurant: async (restaurantData: unknown): Promise<Restaurant> => {
    const response = await api.post('/api/restaurants', restaurantData);
    return response.data;
  },

  updateRestaurant: async (restaurantId: string, restaurantData: unknown): Promise<Restaurant> => {
    const response = await api.put(`/api/restaurants/${restaurantId}`, restaurantData);
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string): Promise<Order> => {
    const response = await api.put(`/api/admin/orders/${orderId}`, { status });
    return response.data;
  },

  deleteRestaurant: async (restaurantId: string): Promise<void> => {
    await api.delete(`/api/admin/restaurants/${restaurantId}`);
  },

  deleteOrder: async (orderId: string): Promise<void> => {
    await api.delete(`/api/admin/orders/${orderId}`);
  },
};
