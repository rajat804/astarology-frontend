import axios from 'axios';
import toast from 'react-hot-toast';

// Simple API URL detection
const getApiUrl = () => {
  const isVercel = window.location.hostname !== 'localhost' && 
                   window.location.hostname !== '127.0.0.1';
  
  console.log('Hostname:', window.location.hostname);
  console.log('Is Vercel:', isVercel);
  
  if (isVercel) {
    return 'https://nakshatraganak-backend.vercel.app/api';
  }
  
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();
console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
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
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
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
          localStorage.removeItem('admin');
          sessionStorage.removeItem('adminToken');
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
  console.log('Register response:', response.data);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    const userInfo = {
      _id: response.data._id,
      fullName: response.data.fullName,
      email: response.data.email
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  console.log('Login response:', response.data);
  
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    const userInfo = {
      _id: response.data._id,
      fullName: response.data.fullName,
      email: response.data.email
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('loginTime', Date.now().toString());
  }
  return response.data;
};

// For users who can't login - temporary fix route
export const fixUserPassword = async (email, newPassword) => {
  const response = await api.post('/auth/fix-password', { email, newPassword });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Network error' };
  }
};

// Reset Password
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Network error' };
  }
};

// Resend OTP
export const resendOTP = async (email) => {
  try {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Network error' };
  }
};



export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// ==================== ADMIN APIs ====================
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
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
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadMultipleImages = async (formData) => {
  const response = await api.post('/upload/multiple', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteImage = async (publicId) => {
  const response = await api.delete('/upload/image', { data: { publicId } });
  return response.data;
};

// Service image upload
export const uploadServiceImage = async (formData) => {
  const response = await api.post('/upload/service-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteServiceImage = async (publicId) => {
  const response = await api.delete('/upload/service-image', { data: { publicId } });
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

// ==================== BOOKING APIs (Admin) ====================
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

export const getBookingStats = async () => {
  const response = await api.get('/bookings/admin/stats/dashboard');
  return response.data;
};

// ==================== BLOG APIs ====================
export const getAllBlogs = async (tag = '', page = 1, limit = 6) => {
  const params = new URLSearchParams();
  if (tag) params.append('tag', tag);
  params.append('page', page);
  params.append('limit', limit);
  const response = await api.get(`/blogs?${params.toString()}`);
  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

export const likeBlog = async (id) => {
  const response = await api.put(`/blogs/${id}/like`);
  return response.data;
};

export const getAllBlogsAdmin = async () => {
  const response = await api.get('/blogs/admin/all');
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/admin/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post('/blogs/admin', blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/admin/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/admin/${id}`);
  return response.data;
};

export const toggleBlogPublish = async (id) => {
  const response = await api.patch(`/blogs/admin/${id}/toggle`);
  return response.data;
};

// ==================== SERVICE APIs ====================
// Public
export const getAllServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const getServiceBySlug = async (slug) => {
  const response = await api.get(`/services/slug/${slug}`);
  return response.data;
};

export const getServicesByCategory = async (category) => {
  const response = await api.get(`/services/category/${category}`);
  return response.data;
};

export const getServiceStats = async () => {
  const response = await api.get('/services/stats');
  return response.data;
};

// Admin Service APIs
export const createService = async (serviceData) => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

export const updateService = async (id, serviceData) => {
  const response = await api.put(`/services/${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

export const toggleServiceStatus = async (id) => {
  const response = await api.patch(`/services/${id}/toggle`);
  return response.data;
};

// ==================== SERVICE PAYMENT APIs ====================
export const createServiceOrder = async (serviceId, amount) => {
  const response = await api.post('/service-payment/create-order', { serviceId, amount });
  return response.data;
};

export const verifyServicePayment = async (paymentData) => {
  const response = await api.post('/service-payment/verify-payment', paymentData);
  return response.data;
};

export const getUserServiceBookings = async () => {
  const response = await api.get('/service-payment/my-bookings');
  return response.data;
};

// ✅ SERVICE BOOKING API - Single export (no duplicate)
export const getMyBookings = async () => {
  const response = await api.get('/service-payment/my-bookings');
  return response.data;
};

// ==================== CONTACT APIs ====================
export const sendContactMessage = async (messageData) => {
  const response = await api.post('/contact', messageData);
  return response.data;
};

export const getAllMessages = async () => {
  const response = await api.get('/admin/contact-messages');
  return response.data;
};

export const updateMessageStatus = async (id, status) => {
  const response = await api.put(`/admin/contact-messages/${id}`, { status });
  return response.data;
};

// ==================== ASTROLOGY APIs ====================
export const generateKundli = async (birthDetails) => {
  const response = await api.post('/astrology/generate', birthDetails);
  return response.data;
};

export const saveChart = async (chartData) => {
  const response = await api.post('/astrology/save', chartData);
  return response.data;
};

export const getSavedCharts = async () => {
  const response = await api.get('/astrology/saved');
  return response.data;
};

export const deleteChart = async (chartId) => {
  const response = await api.delete(`/astrology/saved/${chartId}`);
  return response.data;
};

export const getPurchasedKundlis = async () => {
  const response = await api.get('/astrology/my-purchased-kundlis');
  return response.data;
};

// ==================== STATS APIs ====================
export const getDashboardStats = async () => {
  const response = await api.get('/admin/stats/dashboard');
  return response.data;
};

export const getRevenueStats = async () => {
  const response = await api.get('/admin/stats/revenue');
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get('/admin/stats/users');
  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export const markNotificationRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};


export default api;