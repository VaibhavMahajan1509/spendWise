import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔥 Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH
export const loginUser = (data) => api.post("/auth/login", data);
export const signupUser = (data) => api.post("/auth/signup", data);

// EXPENSES
export const getExpenses = () => api.get("/expenses");
export const addExpense = (data) => api.post("/expenses", data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

export default api;