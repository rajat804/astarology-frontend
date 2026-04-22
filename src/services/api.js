import axios from 'axios';
import toast from 'react-hot-toast';

// Simple API URL detection
const getApiUrl = () => {
  // Check if we're on Vercel (production)
  const isVercel = window.location.hostname !== 'localhost' && 
                   window.location.hostname !== '127.0.0.1';
  
  console.log('Hostname:', window.location.hostname);
  console.log('Is Vercel:', isVercel);
  
  if (isVercel) {
    // Use your backend URL
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
  withCredentials: false,
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
    console.error('Full error:', error);
    
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

// ==================== AUTH APIs ====================
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
  console.log('Login API called with:', credentials.email);
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

// ==================== ADMIN APIs ====================
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

// ==================== PRODUCT APIs ====================
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/products${params ? `?${params}` : ''}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const getProductStats = async () => {
  const response = await api.get('/products/stats/admin');
  return response.data;
};

// ==================== IMAGE UPLOAD APIs ====================
export const uploadImage = async (formData) => {
  const response = await api.post('/upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const uploadMultipleImages = async (formData) => {
  const response = await api.post('/upload/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteImage = async (publicId) => {
  const response = await api.delete('/upload/image', { data: { publicId } });
  return response.data;
};

// ==================== CART APIs ====================
export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post('/cart/add', { productId, quantity });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/update/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await api.delete(`/cart/remove/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete('/cart/clear');
  return response.data;
};

// ==================== PAYMENT APIs ====================
export const createOrder = async (orderData) => {
  const response = await api.post('/payment/create-order', orderData);
  return response.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await api.post('/payment/verify-payment', paymentData);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await api.get('/payment/orders');
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/payment/order/${orderId}`);
  return response.data;
};

// ==================== ORDER APIs (Admin) ====================
export const getAllOrders = async () => {
  const response = await api.get('/orders/admin');
  return response.data;
};

export const getOrderStats = async () => {
  const response = await api.get('/orders/admin/stats/dashboard');
  return response.data;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const response = await api.put(`/orders/admin/${orderId}/status`, { orderStatus });
  return response.data;
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
  const response = await api.put(`/orders/admin/${orderId}/payment`, { paymentStatus });
  return response.data;
};

export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/orders/admin/${orderId}`);
  return response.data;
};

export const getAdminOrderById = async (orderId) => {
  const response = await api.get(`/orders/admin/${orderId}`);
  return response.data;
};

// ==================== BOOKING APIs ====================
export const getAllBookings = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/bookings/admin${params ? `?${params}` : ''}`);
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/admin/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const updateBookingStatus = async (id, bookingStatus) => {
  const response = await api.put(`/bookings/admin/${id}/status`, { bookingStatus });
  return response.data;
};

export const updateBookingPaymentStatus = async (id, paymentStatus) => {
  const response = await api.put(`/bookings/admin/${id}/payment`, { paymentStatus });
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/admin/${id}`);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get('/bookings/my-bookings');
  return response.data;
};

export const getBookingStats = async () => {
  const response = await api.get('/bookings/admin/stats/dashboard');
  return response.data;
};

export default api;