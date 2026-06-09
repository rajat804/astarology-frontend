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
  User,
  Package,
  Truck,
  IndianRupee
} from 'lucide-react';
import { getMyBookings, getUserOrders } from '../services/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch service bookings
      const bookingsData = await getMyBookings();
      console.log('Bookings data:', bookingsData);
      
      let bookingsList = [];
      if (bookingsData.success) {
        bookingsList = bookingsData.bookings || [];
      } else if (Array.isArray(bookingsData)) {
        bookingsList = bookingsData;
      }
      
      // Fetch product orders (payment success)
      const ordersData = await getUserOrders();
      console.log('Orders data:', ordersData);
      
      let ordersList = [];
      if (ordersData.success) {
        ordersList = ordersData.orders || [];
      } else if (Array.isArray(ordersData)) {
        ordersList = ordersData;
      } else if (ordersData.orders) {
        ordersList = ordersData.orders;
      }
      
      // Filter only successful payment orders
      const successOrders = ordersList.filter(order => 
        order.paymentStatus === 'success' || 
        order.orderStatus === 'confirmed' ||
        order.paymentStatus === 'paid'
      );
      
      setBookings(bookingsList);
      setOrders(successOrders);
      
    } catch (error) {
      console.error('Fetch data error:', error);
      toast.error('Failed to load data');
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
      case 'delivered':
        return 'bg-purple-100 text-purple-700';
      case 'shipped':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'delivered':
        return <Truck className="w-4 h-4" />;
      case 'shipped':
        return <Package className="w-4 h-4" />;
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
    }).format(price || 0);
  };

  const downloadServiceInvoice = (booking) => {
    try {
      const doc = new jsPDF();
      
      doc.setFillColor(147, 51, 234);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('Nakshatra Ganak', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text('Service Booking Invoice', 105, 32, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Invoice ID: ${booking._id?.slice(-8) || 'N/A'}`, 20, 55);
      doc.text(`Booking Date: ${formatDateTime(booking.bookedAt)}`, 20, 62);
      doc.text(`Payment ID: ${booking.paymentId || 'N/A'}`, 20, 69);
      
      doc.setFontSize(12);
      doc.text('Customer Details', 20, 85);
      doc.setFontSize(10);
      doc.text(`Name: ${booking.name || booking.fullName || 'N/A'}`, 20, 95);
      doc.text(`Email: ${booking.email || 'N/A'}`, 20, 102);
      doc.text(`Phone: ${booking.phone || 'N/A'}`, 20, 109);
      
      doc.setFontSize(12);
      doc.text('Service Details', 20, 125);
      doc.setFontSize(10);
      doc.text(`Service: ${booking.serviceName || 'N/A'}`, 20, 135);
      doc.text(`Date: ${formatDate(booking.bookingDate)}`, 20, 142);
      doc.text(`Time: ${booking.bookingTime || 'N/A'}`, 20, 149);
      
      doc.setFontSize(12);
      doc.text('Payment Summary', 20, 175);
      doc.setFontSize(10);
      doc.text(`Service Fee: ${formatPrice(booking.servicePrice)}`, 20, 185);
      doc.text(`Total Amount: ${formatPrice(booking.servicePrice)}`, 20, 195);
      
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for choosing Nakshatra Ganak', 105, 270, { align: 'center' });
      doc.text('For any queries, contact: nakshatramongodb@gmail.com', 105, 278, { align: 'center' });
      
      doc.save(`service_booking_${booking._id?.slice(-8)}.pdf`);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download invoice');
    }
  };

  const downloadOrderInvoice = (order) => {
    try {
      const doc = new jsPDF();
      
      doc.setFillColor(147, 51, 234);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text('Nakshatra Ganak', 105, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text('Order Invoice', 105, 32, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Order ID: ${order.orderId || order._id?.slice(-8)}`, 20, 55);
      doc.text(`Order Date: ${formatDateTime(order.createdAt)}`, 20, 62);
      doc.text(`Payment ID: ${order.razorpayPaymentId || 'N/A'}`, 20, 69);
      
      doc.setFontSize(12);
      doc.text('Shipping Details', 20, 85);
      doc.setFontSize(10);
      if (order.shippingAddress) {
        doc.text(`Name: ${order.shippingAddress.fullName || 'N/A'}`, 20, 95);
        doc.text(`Email: ${order.shippingAddress.email || 'N/A'}`, 20, 102);
        doc.text(`Phone: ${order.shippingAddress.phone || 'N/A'}`, 20, 109);
        doc.text(`Address: ${order.shippingAddress.address || 'N/A'}`, 20, 116);
        doc.text(`${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} - ${order.shippingAddress.pincode || ''}`, 20, 123);
      }
      
      doc.setFontSize(12);
      doc.text('Order Items', 20, 140);
      
      // Create table for items
      const tableData = order.items?.map(item => [
        item.name,
        item.quantity,
        formatPrice(item.price)
      ]) || [];
      
      doc.autoTable({
        startY: 148,
        head: [['Product', 'Quantity', 'Price']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [147, 51, 234] }
      });
      
      const finalY = doc.lastAutoTable?.finalY || 170;
      
      doc.setFontSize(12);
      doc.text('Payment Summary', 20, finalY + 15);
      doc.setFontSize(10);
      doc.text(`Total Amount: ${formatPrice(order.totalAmount)}`, 20, finalY + 25);
      doc.text(`Payment Status: ${order.paymentStatus?.toUpperCase() || 'SUCCESS'}`, 20, finalY + 32);
      
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for shopping with Nakshatra Ganak', 105, 270, { align: 'center' });
      doc.text('For any queries, contact: nakshatramongodb@gmail.com', 105, 278, { align: 'center' });
      
      doc.save(`order_${order.orderId || order._id?.slice(-8)}.pdf`);
      toast.success('Order invoice downloaded successfully!');
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
          <p className="text-gray-600 text-lg">Loading your data...</p>
        </div>
      </div>
    );
  }

  const totalServices = bookings.length;
  const totalOrders = orders.length;
  const hasData = totalServices > 0 || totalOrders > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Track your service bookings and product orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-center text-white shadow-lg">
            <p className="text-2xl font-bold">{totalServices}</p>
            <p className="text-sm">Service Bookings</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-4 text-center text-white shadow-lg">
            <p className="text-2xl font-bold">{totalOrders}</p>
            <p className="text-sm">Product Orders</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:shadow-md border border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Service Bookings {totalServices > 0 && `(${totalServices})`}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:shadow-md border border-gray-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Product Orders {totalOrders > 0 && `(${totalOrders})`}
          </button>
        </div>
        
        {!hasData ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-purple-100">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Records Yet</h2>
            <p className="text-gray-500 mb-6">You haven't made any bookings or orders yet.</p>
            <button
              onClick={() => window.location.href = '/services'}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <>
            {/* Service Bookings Tab */}
            {activeTab === 'services' && (
              <div className="space-y-5">
                {bookings.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                    <p className="text-gray-500">No service bookings found</p>
                    <button
                      onClick={() => window.location.href = '/services'}
                      className="mt-4 text-purple-600 hover:text-purple-700"
                    >
                      Book a service →
                    </button>
                  </div>
                ) : (
                  bookings.map((booking, index) => (
                    <ServiceBookingCard
                      key={booking._id || index}
                      booking={booking}
                      formatDate={formatDate}
                      formatDateTime={formatDateTime}
                      formatPrice={formatPrice}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      downloadInvoice={downloadServiceInvoice}
                    />
                  ))
                )}
              </div>
            )}

            {/* Product Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-5">
                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                    <p className="text-gray-500">No product orders found</p>
                    <button
                      onClick={() => window.location.href = '/products'}
                      className="mt-4 text-purple-600 hover:text-purple-700"
                    >
                      Shop now →
                    </button>
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <OrderCard
                      key={order._id || index}
                      order={order}
                      formatDate={formatDate}
                      formatDateTime={formatDateTime}
                      formatPrice={formatPrice}
                      getStatusColor={getStatusColor}
                      getStatusIcon={getStatusIcon}
                      downloadInvoice={downloadOrderInvoice}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Service Booking Card Component
const ServiceBookingCard = ({ booking, formatDate, formatDateTime, formatPrice, getStatusColor, getStatusIcon, downloadInvoice }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100"
    >
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
            <p className="text-xs text-gray-500">Amount</p>
            <p className="font-bold text-xl text-purple-600">{formatPrice(booking.servicePrice)}</p>
          </div>
          
          <div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {getStatusIcon(booking.status)}
              {booking.status?.toUpperCase() || 'CONFIRMED'}
            </span>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center gap-1"
          >
            {expanded ? <>Hide <ChevronUp className="w-4 h-4" /></> : <>View <ChevronDown className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-5 space-y-5 bg-white">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Name:</span> <strong>{booking.name || booking.fullName || 'N/A'}</strong></p>
              <p><span className="text-gray-500">Email:</span> <strong>{booking.email || 'N/A'}</strong></p>
              <p><span className="text-gray-500">Phone:</span> <strong>{booking.phone || 'N/A'}</strong></p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">Service Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Service:</span> <strong>{booking.serviceName}</strong></p>
                <p><span className="text-gray-500">Date:</span> {formatDate(booking.bookingDate)}</p>
                <p><span className="text-gray-500">Time:</span> {booking.bookingTime || 'Flexible'}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Payment ID:</span> <span className="font-mono text-xs">{booking.paymentId || 'N/A'}</span></p>
                <p><span className="text-gray-500">Amount Paid:</span> <strong className="text-green-600">{formatPrice(booking.servicePrice)}</strong></p>
                <p><span className="text-gray-500">Status:</span> <span className="text-green-600">✓ Payment Successful</span></p>
              </div>
            </div>
          </div>
          
          {booking.notes && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
              <p className="text-gray-600 text-sm italic">"{booking.notes}"</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => downloadInvoice(booking)} className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <button onClick={() => window.location.href = '/services'} className="flex-1 py-2.5 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Book Another
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Order Card Component
const OrderCard = ({ order, formatDate, formatDateTime, formatPrice, getStatusColor, getStatusIcon, downloadInvoice }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-indigo-100"
    >
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border-b border-indigo-100">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-800">{order.orderId || order._id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Order Date</p>
            <p className="font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-xl text-indigo-600">{formatPrice(order.totalAmount)}</p>
          </div>
          
          <div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              {order.orderStatus?.toUpperCase() || 'CONFIRMED'}
            </span>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1"
          >
            {expanded ? <>Hide <ChevronUp className="w-4 h-4" /></> : <>View <ChevronDown className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-5 space-y-5 bg-white">
          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p><span className="text-gray-500">Name:</span> <strong>{order.shippingAddress.fullName}</strong></p>
                <p><span className="text-gray-500">Email:</span> {order.shippingAddress.email}</p>
                <p><span className="text-gray-500">Phone:</span> {order.shippingAddress.phone}</p>
                <p><span className="text-gray-500">Address:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              </div>
            </div>
          )}
          
          {/* Order Items */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" />
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-indigo-600">{formatPrice(item.price)}</p>
                    <p className="text-xs text-gray-400">each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Summary */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-indigo-600">{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status:</span>
                <span className="text-green-600 font-semibold">✓ {order.paymentStatus?.toUpperCase() || 'SUCCESS'}</span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono text-xs">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => downloadInvoice(order)} className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
            <button onClick={() => window.location.href = '/products'} className="flex-1 py-2.5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Shop More
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyBookingsPage;