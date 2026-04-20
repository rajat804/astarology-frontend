import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  ShoppingBag, 
  CreditCard,
  Package
} from 'lucide-react';
import { getUserOrders } from '../services/api';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-purple-100 text-purple-700';
      case 'shipped':
        return 'bg-orange-100 text-orange-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-offWhite py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-orange-100">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No orders yet</p>
            <button
              onClick={() => window.location.href = '/products'}
              className="mt-4 text-red-500 hover:text-red-600 font-semibold"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 border-b border-orange-100">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold text-gray-800">{order.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Date</p>
                      <p className="font-semibold text-gray-800 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-red-600 flex items-center gap-1">
                        ₹{order.totalAmount}
                      </p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                      className="text-red-500 hover:text-red-600 font-semibold text-sm"
                    >
                      {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                </div>
                
                {/* Order Details */}
                {selectedOrder === order._id && (
                  <div className="p-4 space-y-4">
                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 p-3 bg-orange-50 rounded-xl">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-red-600 font-semibold">₹{item.price}</p>
                              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Shipping Address
                        </h3>
                        <div className="bg-orange-50 p-3 rounded-xl">
                          <p className="text-gray-700">{order.shippingAddress.fullName}</p>
                          <p className="text-gray-600 text-sm">{order.shippingAddress.address}</p>
                          <p className="text-gray-600 text-sm">
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                          </p>
                          <p className="text-gray-600 text-sm">{order.shippingAddress.country}</p>
                          <p className="text-gray-600 text-sm">Phone: {order.shippingAddress.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Payment Info */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Payment Information
                      </h3>
                      <div className="bg-orange-50 p-3 rounded-xl">
                        <p className="text-gray-700">Payment Method: Razorpay</p>
                        <p className="text-gray-700">Payment Status: {order.paymentStatus}</p>
                        {order.razorpayPaymentId && (
                          <p className="text-gray-600 text-sm">Transaction ID: {order.razorpayPaymentId}</p>
                        )}
                      </div>
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