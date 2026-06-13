import api from './api';

export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getUserOrders = async (params?: any) => {
  const response = await api.get('/orders', { params });
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id: string, reason: string) => {
  const response = await api.put(`/orders/${id}/cancel`, { cancellationReason: reason });
  return response.data;
};

export const rateOrder = async (id: string, rating: number, review?: string) => {
  const response = await api.put(`/orders/${id}/rate`, { rating, review });
  return response.data;
};
