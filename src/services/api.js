import axios from 'axios';
import toast from 'react-hot-toast';

// Simple API URL detection - no extra files needed
const getApiUrl = () => {
  // Check if we're on Vercel (production) by checking the hostname
  const isVercel = window.location.hostname !== 'localhost' && 
                   window.location.hostname !== '127.0.0.1';
  
  console.log('Is Vercel:', isVercel);
  console.log('Hostname:', window.location.hostname);
  
  if (isVercel) {
    // Use your backend URL directly
    return 'https://ashtroplanet-backend.vercel.app/api';
  }
  
  // Local development
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (!token) {
      token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`${config.method.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      toast.error('Cannot connect to server. Please check if backend is running.');
    } else {
      const message = error.response?.data?.msg || error.response?.data?.message || 'An error occurred';
      
      if (error.response?.status === 401) {
        if (error.config.url?.includes('/admin/')) {
          localStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminToken');
          localStorage.removeItem('admin');
          sessionStorage.removeItem('admin');
          window.location.href = '/admin/login';
          toast.error('Admin session expired. Please login again.');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth';
          toast.error('Session expired. Please login again.');
        }
      } else {
        toast.error(message);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Admin APIs
export const adminLogin = async (credentials) => {
  console.log('Admin login API called with:', credentials.email);
  
  try {
    const response = await api.post('/admin/login', credentials);
    console.log('Admin login response:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      console.log('Admin token stored successfully');
    }
    return response.data;
  } catch (error) {
    console.error('Admin login API error:', error);
    throw error;
  }
};

export const createAdmin = async (adminData) => {
  const response = await api.post('/admin/create', adminData);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUserStatus = async (userId, isActive) => {
  const response = await api.put(`/admin/users/${userId}`, { isActive });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get('/admin/me');
  return response.data;
};

export const isAdminLoggedIn = () => {
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
  return !!(token && admin);
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin');
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('admin');
  toast.success('Admin logged out successfully');
  window.location.href = '/admin/login';
};

export default api;