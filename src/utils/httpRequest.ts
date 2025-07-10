import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Gửi cookie trong mỗi request
});

export default httpRequest;
