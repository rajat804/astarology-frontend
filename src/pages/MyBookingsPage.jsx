import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,      
  Clock,         
  Phone,         
  Mail,          
  MessageSquare, 
  CheckCircle,   
  XCircle,       
  Download,      
  Eye,           
  ChevronDown,   
  ChevronUp,     
  CreditCard,    
  MapPin,        
  ShoppingBag,
  User
} from 'lucide-react';
import { getMyBookings } from '../services/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      console.log('Bookings data:', data);
      
      let bookingsList = [];
      if (data.success) {
        bookingsList = data.bookings || [];
      } else if (Array.isArray(data)) {
        bookingsList = data;
      } else {
        bookingsList = [];
      }
      
      // Log each booking to see the structure
      bookingsList.forEach((booking, idx) => {
        console.log(`Booking ${idx + 1}:`, {
          name: booking.name || booking.fullName,
          email: booking.email,
          phone: booking.phone
        });
      });
      
      setBookings(bookingsList);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const downloadInvoice = (booking) => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(102, 126, 234);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('Nakshatra Ganak', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text('Service Booking Invoice', 105, 32, { align: 'center' });
      
      // Invoice Details
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Invoice ID: ${booking._id?.slice(-8) || 'N/A'}`, 20, 55);
      doc.text(`Booking Date: ${formatDateTime(booking.bookedAt)}`, 20, 62);
      doc.text(`Payment ID: ${booking.paymentId || 'N/A'}`, 20, 69);
      
      // Customer Details - ✅ Using correct fields
      doc.setFontSize(12);
      doc.text('Customer Details', 20, 85);
      doc.setFontSize(10);
      doc.text(`Name: ${booking.name || booking.fullName || 'N/A'}`, 20, 95);
      doc.text(`Email: ${booking.email || 'N/A'}`, 20, 102);
      doc.text(`Phone: ${booking.phone || 'N/A'}`, 20, 109);
      
      // Service Details
      doc.setFontSize(12);
      doc.text('Service Details', 20, 125);
      doc.setFontSize(10);
      doc.text(`Service: ${booking.serviceName || 'N/A'}`, 20, 135);
      doc.text(`Date: ${formatDate(booking.bookingDate)}`, 20, 142);
      doc.text(`Time: ${booking.bookingTime || 'N/A'}`, 20, 149);
      
      // Amount
      doc.setFontSize(12);
      doc.text('Payment Summary', 20, 175);
      doc.setFontSize(10);
      doc.text(`Service Fee: ${formatPrice(booking.servicePrice || 0)}`, 20, 185);
      doc.text(`Total Amount: ${formatPrice(booking.servicePrice || 0)}`, 20, 195);
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for choosing Nakshatra Ganak', 105, 270, { align: 'center' });
      doc.text('For any queries, contact: nakshatramongodb@gmail.com', 105, 278, { align: 'center' });
      
      doc.save(`booking_${booking._id?.slice(-8)}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download invoice');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Service Bookings
          </h1>
          <p className="text-gray-600">
            Track and manage all your spiritual service bookings
          </p>
        </div>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-purple-100">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
            <button
              onClick={() => window.location.href = '/services'}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100"
              >
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 border-b border-purple-100">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Booking ID</p>
                        <p className="font-semibold text-gray-800">{booking._id?.slice(-8).toUpperCase() || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Booked On</p>
                      <p className="font-semibold text-gray-800 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDateTime(booking.bookedAt)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="font-bold text-xl text-purple-600">
                        {formatPrice(booking.servicePrice)}
                      </p>
                    </div>
                    
                    <div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status?.toUpperCase() || 'CONFIRMED'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setExpandedBooking(expandedBooking === booking._id ? null : booking._id)}
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1 transition-all"
                    >
                      {expandedBooking === booking._id ? (
                        <>Hide Details <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>View Details <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Booking Details */}
                {expandedBooking === booking._id && (
                  <div className="p-5 space-y-5 bg-white">
                    {/* Customer Info - ✅ Name, Email, Phone will show here */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-600" />
                        Customer Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Name:</span>
                          <strong className="text-gray-800">{booking.name || booking.fullName || 'N/A'}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Email:</span>
                          <strong className="text-gray-800">{booking.email || 'N/A'}</strong>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Phone:</span>
                          <strong className="text-gray-800">{booking.phone || 'N/A'}</strong>
                        </p>
                      </div>
                    </div>
                    
                    {/* Service Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600" />
                          Service Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-500">Service:</span> <strong>{booking.serviceName}</strong></p>
                          <p><span className="text-gray-500">Date:</span> {formatDate(booking.bookingDate)}</p>
                          <p><span className="text-gray-500">Time:</span> {booking.bookingTime || 'Flexible'}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-purple-600" />
                          Payment Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-500">Payment ID:</span> <span className="font-mono text-xs">{booking.paymentId || 'N/A'}</span></p>
                          <p><span className="text-gray-500">Order ID:</span> <span className="font-mono text-xs">{booking.orderId || 'N/A'}</span></p>
                          <p><span className="text-gray-500">Amount Paid:</span> <strong className="text-green-600">{formatPrice(booking.servicePrice)}</strong></p>
                          <p><span className="text-gray-500">Status:</span> <span className="text-green-600">Paid</span></p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {booking.notes && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-purple-600" />
                          Additional Notes
                        </h3>
                        <p className="text-gray-600 text-sm italic">"{booking.notes}"</p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => downloadInvoice(booking)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Invoice
                      </button>
                      <button
                        onClick={() => window.location.href = '/services'}
                        className="flex-1 py-2.5 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Book Another Service
                      </button>
                    </div>
                    
                    {/* Help Text */}
                    <div className="text-center text-xs text-gray-400 pt-2">
                      <p>For any queries regarding your booking, please contact us at nakshatramongodb@gmail.com</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;