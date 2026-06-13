import api from './api';

export const getAddresses = async () => {
  const response = await api.get('/user/addresses');
  return response.data;
};

export const addAddress = async (addressData: any) => {
  const response = await api.post('/user/addresses', addressData);
  return response.data;
};

export const updateAddress = async (addressId: string, addressData: any) => {
  const response = await api.put(`/user/addresses/${addressId}`, addressData);
  return response.data;
};

export const deleteAddress = async (addressId: string) => {
  const response = await api.delete(`/user/addresses/${addressId}`);
  return response.data;
};

export const setDefaultAddress = async (addressId: string) => {
  const response = await api.put(`/user/addresses/${addressId}/default`);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export const updateProfile = async (profileData: any) => {
  const response = await api.put('/auth/profile', profileData);
  return response.data;
};
