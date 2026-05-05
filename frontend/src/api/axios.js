import axios from "axios";

const API = axios.create({
  baseURL: "https://electro-etalon.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ee_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const fileUrl = (url) => {
  if (!url) return "";

  // если уже полный URL
  if (url.startsWith("http")) return url;

  // если приходит /api/...
  if (url.startsWith("/api/")) {
    return `https://electro-etalon.onrender.com${url}`;
  }

  // обычный файл
  return `https://electro-etalon.onrender.com/api/files/${url}`;
};

export default API;