import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineCreditCard,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineDocumentText
} from 'react-icons/hi';
import { HiOutlineTag } from "react-icons/hi2";

const ServiceBooking = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getToken, isAuthenticated, user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    if (slug) {
      fetchService();
    }
  }, [slug]);

  // Pre-fill user data when available
  useEffect(() => {
    if (user) {
      setBookingDetails(prev => ({
        ...prev,
        name: user?.fullName || '',
        email: user?.email || ''
      }));
    }
  }, [user]);

  const fetchService = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/services/slug/${slug}`);
      if (response.data.success && response.data.service) {
        setService(response.data.service);
        if (response.data.service.image && response.data.service.image !== '') {
          setSelectedImage(response.data.service.image);
        }
      } else {
        toast.error('Service not found');
        navigate('/services');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      if (error.response?.status === 404) {
        toast.error('Service not found');
        navigate('/services');
      } else if (error.response?.status === 401) {
        toast.error('Please login to continue');
        navigate('/auth');
      } else {
        toast.error('Failed to load service details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const token = getToken();
    if (!token && !isAuthenticated) {
      toast.error('Please login to book services');
      navigate('/auth');
      return;
    }

    // ✅ Validate all fields
    if (!bookingDetails.name) {
      toast.error('Please enter your full name');
      return;
    }
    if (!bookingDetails.email) {
      toast.error('Please enter your email');
      return;
    }
    if (!bookingDetails.phone) {
      toast.error('Please enter your phone number');
      return;
    }
    if (!bookingDetails.date) {
      toast.error('Please select preferred date');
      return;
    }
    if (!bookingDetails.time) {
      toast.error('Please select preferred time');
      return;
    }

    setProcessing(true);
    try {
      const orderRes = await api.post('/service-payment/create-order', {
        serviceId: service._id,
        amount: service.price
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: 'Nakshatra Ganak',
        description: service.name,
        order_id: orderRes.data.id,
        handler: async (response) => {
          toast.loading('Verifying payment...', { id: 'payment' });

          // ✅ Send ALL user details to backend
          const verifyRes = await api.post('/service-payment/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            serviceId: service._id,
            bookingDate: bookingDetails.date,
            bookingTime: bookingDetails.time,
            notes: bookingDetails.notes,
            name: bookingDetails.name,
            email: bookingDetails.email,
            phone: bookingDetails.phone
          });

          if (verifyRes.data.success) {
            toast.success(
              (t) => (
                <div>
                  <strong>✅ Booking Confirmed!</strong>
                  <p>Your service has been booked successfully.</p>
                  <p>A confirmation email has been sent to your inbox.</p>
                  <button
                    onClick={() => {
                      toast.dismiss(t.id);
                      navigate('/my-bookings');
                    }}
                    style={{
                      marginTop: '8px',
                      padding: '4px 12px',
                      background: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    View My Bookings
                  </button>
                </div>
              ),
              { duration: 5000 }
            );

            setTimeout(() => {
              navigate('/my-bookings');
            }, 2000);
          } else {
            toast.error('Payment verification failed', { id: 'payment' });
          }
        },
        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled');
            setProcessing(false);
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
      razorpay.on('payment.failed', function (response) {
        toast.error('Payment failed: ' + response.error.description);
        setProcessing(false);
      });
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Payment failed. Please try again.');
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
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const handleImageError = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md shadow-xl">
          <div className="text-6xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Browse All Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/services')}
          className="group mb-6 inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-all duration-300"
        >
          <HiOutlineArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Services</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Image Section */}
          <div className="relative bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 w-full">
            <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={service.name}
                  className="w-full h-full object-cover object-center"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700">
                  <div className="text-8xl md:text-9xl mb-4 bg-white/10 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm shadow-lg">
                    {service.icon || '🔮'}
                  </div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 px-4 text-center">
                    {service.name}
                  </h1>
                  <p className="text-purple-100 text-sm max-w-md mx-auto px-4 text-center">
                    {service.shortDescription}
                  </p>
                </div>
              )}
            </div>

            {selectedImage && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-end pb-6 md:pb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 px-4 text-center drop-shadow-lg">
                  {service.name}
                </h1>
                <p className="text-white/90 text-sm max-w-md mx-auto px-4 text-center drop-shadow">
                  {service.shortDescription}
                </p>
                {service.discount > 0 && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    <HiOutlineTag className="w-4 h-4" />
                    {service.discount}% OFF - Save {formatPrice(service.price * service.discount / 100)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Form Section */}
          <div className="p-6 md:p-8 bg-white">
            {/* Price Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-semibold text-gray-800">{formatPrice(service.price)}</span>
              </div>
              {service.discount > 0 && (
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span>Discount ({service.discount}%)</span>
                  <span>- {formatPrice(service.price * service.discount / 100)}</span>
                </div>
              )}
              <div className="border-t border-purple-100 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatPrice(service.price)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <HiOutlineClock className="w-3 h-3" />
                <span>Duration: {service.duration}</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <HiOutlineCalendar className="w-5 h-5 text-purple-600" />
                Your Booking Details
              </h3>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <HiOutlineUser className="w-4 h-4 text-purple-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <HiOutlineMail className="w-4 h-4 text-purple-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingDetails.email}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <HiOutlinePhone className="w-4 h-4 text-purple-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <HiOutlineCalendar className="w-4 h-4 text-purple-500" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <HiOutlineClock className="w-4 h-4 text-purple-500" />
                    Preferred Time *
                  </label>
                  <select
                    value={bookingDetails.time}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    required
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <HiOutlineDocumentText className="w-4 h-4 text-purple-500" />
                  Additional Notes
                </label>
                <textarea
                  value={bookingDetails.notes}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                  rows="3"
                  placeholder="Any specific questions, concerns, or details you'd like to share..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
                />
              </div>

              {/* Features Summary */}
              {service.features && service.features.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">✨ This session includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <span key={idx} className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                        <HiOutlineCheck className="w-3 h-3 text-green-500" />
                        {feature.length > 30 ? feature.substring(0, 30) + '...' : feature}
                      </span>
                    ))}
                    {service.features.length > 4 && (
                      <span className="text-xs text-gray-400">+{service.features.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing || !bookingDetails.date || !bookingDetails.time}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <HiOutlineCreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Pay {formatPrice(service.price)} & Confirm Booking
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <HiOutlineShieldCheck className="w-4 h-4" />
                <span>Secure payment powered by Razorpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;