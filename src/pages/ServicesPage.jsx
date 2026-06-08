import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineCash, 
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineArrowRight,
  HiOutlineSparkles
} from 'react-icons/hi';
// import { HiOutlineTag } from "react-icons/hi2";
const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: '',
    time: '',
    notes: '',
    name: '',
    email: '',
    phone: ''
  });
  const [processing, setProcessing] = useState(false);
  
  const { getToken, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const api = axios.create({ baseURL: API_BASE_URL });

  // Add token to requests
  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const categories = [
    { id: 'all', name: 'All Services', icon: '✨', color: 'purple' },
    { id: 'vedic-astrology', name: 'Vedic Astrology', icon: '🔮', color: 'purple' },
    { id: 'numerology', name: 'Numerology', icon: '🔢', color: 'blue' },
    { id: 'face-reading', name: 'Face Reading', icon: '👤', color: 'pink' },
    { id: 'vastu', name: 'Vastu Shastra', icon: '🏠', color: 'green' },
    { id: 'paranormal', name: 'Paranormal', icon: '👻', color: 'indigo' },
    { id: 'spiritual-healing', name: 'Spiritual Healing', icon: '🕉️', color: 'amber' }
  ];

  useEffect(() => {
    fetchServices();
  }, [selectedCategory]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all' 
        ? '/services' 
        : `/services/category/${selectedCategory}`;
      const response = await api.get(url);
      
      if (response.data.success) {
        setServices(response.data.services);
      } else if (response.data.services) {
        setServices(response.data.services);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (service) => {
    if (!getToken() || !isAuthenticated) {
      toast.error('Please login to book services');
      navigate('/auth');
      return;
    }
    setSelectedService(service);
    setBookingDetails({ 
      date: '', 
      time: '', 
      notes: '',
      name: user?.fullName || '',
      email: user?.email || '',
      phone: ''
    });
    setShowPaymentModal(true);
  };

  const closeModal = useCallback(() => {
    setShowPaymentModal(false);
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  }, []);

  const handlePayment = async () => {
    if (!selectedService) return;
    
    if (!bookingDetails.date || !bookingDetails.time) {
      toast.error('Please select date and time');
      return;
    }
    
    setProcessing(true);
    try {
      const orderRes = await api.post('/service-payment/create-order', {
        serviceId: selectedService._id,
        amount: selectedService.price
      });
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: 'Nakshatra Ganak',
        description: selectedService.name,
        order_id: orderRes.data.id,
        handler: async (response) => {
          const verifyRes = await api.post('/service-payment/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            serviceId: selectedService._id,
            bookingDate: bookingDetails.date,
            bookingTime: bookingDetails.time,
            notes: bookingDetails.notes
          });
          
          if (verifyRes.data.success) {
            closeModal();
            toast.success('Booking confirmed! Check your profile.');
            navigate('/my-bookings');
          } else {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: bookingDetails.name || user?.fullName || '',
          email: bookingDetails.email || user?.email || '',
          contact: bookingDetails.phone || ''
        },
        theme: { color: '#667eea' }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading mystical services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
            <HiOutlineSparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Sacred Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
            Our Divine Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our expert astrological and spiritual services tailored to guide your journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-r from-${cat.color}-600 to-${cat.color}-700 text-white shadow-lg scale-105`
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl">
            <p className="text-gray-500 text-lg">No services found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image/Icon Section */}
                <div className="relative h-56 overflow-hidden">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-7xl">{service.icon || '🔮'}</span>
                    </div>
                  )}
                  {service.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {service.discount}% OFF
                    </div>
                  )}
                  {service.isPopular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Popular
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  
                  {/* Price Section */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(service.price)}
                    </span>
                    {service.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(service.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <HiOutlineClock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBookNow(service)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                  >
                    Book Now
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl">
                    {selectedService.icon || '🔮'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Book Session</h2>
                    <p className="text-sm text-gray-500">{selectedService.name}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <HiOutlineX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Service Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Service Price</span>
                    <span className="text-xl font-bold text-purple-600">{formatPrice(selectedService.price)}</span>
                  </div>
                  {selectedService.discount > 0 && (
                    <div className="flex justify-between items-center text-sm text-green-600 mb-2">
                      <span>Discount Applied</span>
                      <span>{selectedService.discount}% OFF</span>
                    </div>
                  )}
                  <div className="border-t border-purple-100 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-green-600">{formatPrice(selectedService.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-5">
                  <h3 className="font-semibold text-gray-800 text-lg">Booking Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={bookingDetails.email}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, date: e.target.value }))}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                      <select
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      >
                        <option value="">Select time slot</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea
                      value={bookingDetails.notes}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, notes: e.target.value }))}
                      rows="3"
                      placeholder="Any specific questions or concerns..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={processing || !bookingDetails.date || !bookingDetails.time}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ${formatPrice(selectedService.price)} & Book`
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;