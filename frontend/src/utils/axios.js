import axios from 'axios';
import { API_ENDPOINTS } from './api';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  logout: () => api.post('/api/auth/logout'),
  getMe: () => api.get('/api/auth/me'),
};

// Resume API functions
export const resumeAPI = {
  getAll: () => api.get('/api/resumes'),
  getById: (id) => api.get(`/api/resumes/${id}`),
  create: (resumeData) => api.post('/api/resumes', resumeData),
  update: (id, resumeData) => api.put(`/api/resumes/${id}`, resumeData),
  delete: (id) => api.delete(`/api/resumes/${id}`),
  getPublic: (slug) => api.get(`/api/resumes/public/${slug}`),
  togglePublic: (id) => api.patch(`/api/resumes/${id}/toggle-public`),
};

// Payment API functions
export const paymentAPI = {
  createOrder: (orderData) => api.post('/api/payments/create-order', orderData),
  verifyPayment: (paymentData) => api.post('/api/payments/verify', paymentData),
  getHistory: () => api.get('/api/payments/history'),
};

export default api;

