import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineTrash, HiOutlineCreditCard, HiOutlineTruck, HiOutlineLocationMarker  } from 'react-icons/hi';

const OrdersTable = ({ orders, onUpdateStatus, onDelete }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-orange-100 text-orange-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="hover:bg-orange-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm text-gray-800">{order.orderId}</div>
                    <div className="text-xs text-gray-400">ID: {order._id?.slice(-8).toUpperCase()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-800">
                        {order.shippingAddress?.fullName || order.user?.fullName || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.shippingAddress?.email || order.user?.email || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-400">
                        📞 {order.shippingAddress?.phone || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">₹{order.totalAmount || order.totalAmount}</div>
                    <div className="text-xs text-gray-400">Items: {order.items?.length || 0}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-center ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus?.toUpperCase() || 'PENDING'}
                      </span>
                      {order.paymentMethod && (
                        <span className="text-xs text-gray-500 text-center">{order.paymentMethod}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-red-500 ${getStatusColor(order.orderStatus)}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status.toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-800"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                      <span className="text-sm">{order.items?.length || 0} items</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this order?')) {
                          onDelete(order._id);
                        }
                      }}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="Delete Order"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Expanded Order Details */}
                {expandedOrder === order._id && (
                  <tr className="bg-orange-50/30">
                    <td colSpan="8" className="px-6 py-6">
                      <div className="space-y-6">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            🛍️ Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items?.map((item, idx) => (
                              <div key={item._id || idx} className="bg-white rounded-lg p-4 flex items-center gap-4 border border-orange-100">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=No+Image'; }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800">{item.name}</h5>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                  {item.price && (
                                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-red-600">₹{item.price * item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shipping Address */}
                        {order.shippingAddress && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <HiOutlineLocationMarker  className="w-5 h-5 text-red-500" />
                              Shipping Address
                            </h4>
                            <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Full Name</p>
                                <p className="text-gray-800">{order.shippingAddress.fullName}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-gray-800">{order.shippingAddress.email}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-gray-800">{order.shippingAddress.phone}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Address</p>
                                <p className="text-gray-800">
                                  {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Country</p>
                                <p className="text-gray-800">{order.shippingAddress.country}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment Information */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <HiOutlineCreditCard className="w-5 h-5 text-red-500" />
                            Payment Information
                          </h4>
                          <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Payment Status</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPaymentStatusColor(order.paymentStatus)}`}>
                                {order.paymentStatus?.toUpperCase() || 'PENDING'}
                              </span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Payment Method</p>
                              <p className="text-gray-800">{order.paymentMethod || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Total Amount</p>
                              <p className="text-gray-800 font-semibold">₹{order.totalAmount}</p>
                            </div>
                            {order.razorpayPaymentId && (
                              <div>
                                <p className="text-xs text-gray-500">Razorpay Payment ID</p>
                                <p className="text-gray-800 text-sm font-mono">{order.razorpayPaymentId}</p>
                              </div>
                            )}
                            {order.razorpayOrderId && (
                              <div>
                                <p className="text-xs text-gray-500">Razorpay Order ID</p>
                                <p className="text-gray-800 text-sm font-mono">{order.razorpayOrderId}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Order Timeline */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <HiOutlineTruck className="w-5 h-5 text-red-500" />
                            Order Timeline
                          </h4>
                          <div className="bg-white rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <span className="text-sm text-gray-500">Order Created</span>
                              <span className="text-sm text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
                            </div>
                            {order.updatedAt && order.updatedAt !== order.createdAt && (
                              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Last Updated</span>
                                <span className="text-sm text-gray-800">{new Date(order.updatedAt).toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Current Status</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                {order.orderStatus?.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;