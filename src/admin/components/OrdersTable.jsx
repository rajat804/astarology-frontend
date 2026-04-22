import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';

const OrdersTable = ({ orders, onUpdateStatus, onDelete }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-orange-100 text-orange-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
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
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-orange-50 transition">
                <td className="px-6 py-4 font-mono text-sm text-gray-800">{order.orderId}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-800">{order.user?.fullName || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">₹{order.totalAmount}</td>
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
                <td className="px-6 py-4 text-gray-600">{order.items?.length || 0} items</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this order?')) {
                        onDelete(order._id);
                      }
                    }}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;