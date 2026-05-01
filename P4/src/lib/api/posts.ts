import { api } from "./axios";

export const getAllPosts = async (page: number = 1) => {
  const response = await api.get(`/home?page=${page}`);
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (contenido: string) => {
  const response = await api.post("/posts", { contenido });
  return response.data;
};

export const likePost = async (id: string) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const retweetPost = async (id: string) => {
  const response = await api.post(`/posts/${id}/retweet`);
  return response.data;
};

export const createComment = async (id: string, contenido: string) => {
  const response = await api.post(`/posts/${id}/comment`, { contenido });
  return response.data;
};
