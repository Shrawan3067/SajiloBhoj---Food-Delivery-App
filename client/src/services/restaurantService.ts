import api from './api';

export const getRestaurants = async (params?: any) => {
  const response = await api.get('/restaurants', { params });
  return response.data;
};

export const getRestaurantById = async (id: string) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export const getRestaurantMenu = async (id: string) => {
  const response = await api.get(`/restaurants/${id}/menu`);
  return response.data;
};
