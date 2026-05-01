import { api } from "./axios";

export const getCommentsByPost = async (postId: string) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const createComment = async (postId: string, contenido: string) => {
  const response = await api.post(`/posts/${postId}/comments`, { contenido });
  return response.data;
};