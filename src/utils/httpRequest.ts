import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const httpRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default httpRequest;
