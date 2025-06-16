const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  ME: `${API_BASE_URL}/api/auth/me`,
  
  // Resume endpoints
  RESUMES: `${API_BASE_URL}/api/resumes`,
  RESUME_BY_ID: (id) => `${API_BASE_URL}/api/resumes/${id}`,
  PUBLIC_RESUME: (slug) => `${API_BASE_URL}/api/resumes/public/${slug}`,
  TOGGLE_PUBLIC: (id) => `${API_BASE_URL}/api/resumes/${id}/toggle-public`,
  
  // Payment endpoints
  CREATE_ORDER: `${API_BASE_URL}/api/payments/create-order`,
  VERIFY_PAYMENT: `${API_BASE_URL}/api/payments/verify`,
  PAYMENT_HISTORY: `${API_BASE_URL}/api/payments/history`,
};

export default API_BASE_URL;

