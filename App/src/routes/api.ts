import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5721",
});

export default api;