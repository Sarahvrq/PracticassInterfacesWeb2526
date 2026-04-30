import { api } from "./axios";

export const getProductById = async (id: string) => {
  const respuesta = await api.get(`/${id}`);
  return respuesta;
};

export const getAllProducts = async () => {
  const respuesta = await api.get("/");
  return respuesta;
};

export const searchProducts = async (query: string) => {
  const respuesta = await api.get(`/search?q=${query}`);
  return respuesta;
};