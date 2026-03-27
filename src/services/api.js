import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Add timeout
});

// Add token to requests if it exists (for both user and admin)
api.interceptors.request.use(
  (config) => {
    // Check for user token first
    let token = localStorage.getItem('token');
    
    // If no user token, check for admin token
    if (!token) {
      token = localStorage.getItem('adminToken');
    }
    
    // If still no token, check session storage
    if (!token) {
      token = sessionStorage.getItem('adminToken');
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log(`${config.method.toUpperCase()} ${config.url}`, config.data);
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    // Log response for debugging
    console.log(`Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    
    // Handle different error scenarios
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      toast.error('Cannot connect to server. Please make sure the backend is running.');
    } else {
      const message = error.response?.data?.msg || error.response?.data?.message || 'An error occurred';
      
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        // Check if it's an admin route
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
    // Store login time for session management
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    // Store login time for session management
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
      // Store admin token and data
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

// Utility function to check if admin is logged in
export const isAdminLoggedIn = () => {
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  const admin = localStorage.getItem('admin') || sessionStorage.getItem('admin');
  return !!(token && admin);
};

// Utility function to logout admin
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin');
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('admin');
  toast.success('Admin logged out successfully');
  window.location.href = '/admin/login';
};

export default api;