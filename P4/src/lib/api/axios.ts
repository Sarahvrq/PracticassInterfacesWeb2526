import axios from "axios";

export const api = axios.create({

  baseURL: "https://backend-p4-klvc.onrender.com/api",
  timeout: 5000,
  headers: {
    "x-nombre": "Sarah Rojas"
  },

});

api.interceptors.request.use((config) => {

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});