import axios from 'axios';

const API_BASE_URL = 'https://todolistapi-npox.onrender.com/api/TaskItems';
const AUTH_URL = 'https://todolistapi-npox.onrender.com/api/Auth';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Helper to format JS Date to yyyy-MM-dd
const formatDateForQuery = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// ✅ Modified to accept optional `date` query parameter
export const getTasks = async (date = null) => {
  const query = date ? `?date=${formatDateForQuery(date)}` : '';
  const res = await axios.get(`${API_BASE_URL}${query}`, getAuthHeader());
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`, getAuthHeader());
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_BASE_URL, task, getAuthHeader());
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, task, getAuthHeader());
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`, getAuthHeader());
};

// -----------------------
// 🔐 Auth APIs
// -----------------------

export const register = async (user) => {
  const res = await axios.post(`${AUTH_URL}/register`, user);
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(`${AUTH_URL}/login`, user);
  return res.data;
};
