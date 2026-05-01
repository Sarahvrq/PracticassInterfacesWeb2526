import { api } from "./axios";

export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const getUserProfile = async (id: string) => {
  const response = await api.get(`/users/${id}/profile`);
  return response.data;
};

export const toggleFollow = async (id: string) => {
  const response = await api.post(`/users/${id}/follow`);
  return response.data;
};