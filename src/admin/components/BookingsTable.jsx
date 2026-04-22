import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineTrash, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BookingsTable = ({ bookings, onUpdateStatus, onDelete }) => {
  const [expandedBooking, setExpandedBooking] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'no-show': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const statusOptions = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-6 py-4">Booking ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {bookings.map((booking) => (
              <React.Fragment key={booking._id}>
                <tr className="hover:bg-orange-50 transition">
                  <td className="px-6 py-4 font-mono text-sm text-gray-800">
                    {booking.bookingId}
                   </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-800">{booking.customerName}</div>
                      <div className="text-xs text-gray-500">{booking.customerEmail}</div>
                    </div>
                   </td>
                  <td className="px-6 py-4 text-gray-600">{booking.serviceType}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-800">{new Date(booking.bookingDate).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{booking.bookingTime}</div>
                    </div>
                   </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">₹{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                   </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.bookingStatus}
                      onChange={(e) => onUpdateStatus(booking._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-red-500 ${getStatusColor(booking.bookingStatus)}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="text-gray-800">
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpandedBooking(expandedBooking === booking._id ? null : booking._id)}
                        className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                        title="View Details"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this booking?')) {
                            onDelete(booking._id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        title="Delete Booking"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                   </td>
                 </tr>
                
                {/* Expanded Booking Details */}
                {expandedBooking === booking._id && (
                  <tr className="bg-orange-50/30">
                    <td colSpan="8" className="px-6 py-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">Booking Details</h4>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Customer Information</p>
                            <div className="mt-1">
                              <p className="text-gray-800">Name: {booking.customerName}</p>
                              <p className="text-gray-600 text-sm">Email: {booking.customerEmail}</p>
                              <p className="text-gray-600 text-sm">Phone: {booking.customerPhone}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500">Booking Information</p>
                            <div className="mt-1">
                              <p className="text-gray-800">Service: {booking.serviceType}</p>
                              <p className="text-gray-600 text-sm">Provider: {booking.serviceProvider || 'Astrologer'}</p>
                              <p className="text-gray-600 text-sm">Duration: {booking.duration} minutes</p>
                            </div>
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <div>
                            <p className="text-sm text-gray-500">Notes</p>
                            <p className="text-gray-600 mt-1">{booking.notes}</p>
                          </div>
                        )}
                        
                        {booking.specialRequests && (
                          <div>
                            <p className="text-sm text-gray-500">Special Requests</p>
                            <p className="text-gray-600 mt-1">{booking.specialRequests}</p>
                          </div>
                        )}
                        
                        {booking.paymentId && (
                          <div>
                            <p className="text-sm text-gray-500">Payment Information</p>
                            <p className="text-gray-600 text-sm">Transaction ID: {booking.paymentId}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-500">Timestamps</p>
                          <p className="text-gray-600 text-sm">Created: {new Date(booking.createdAt).toLocaleString()}</p>
                          <p className="text-gray-600 text-sm">Last Updated: {new Date(booking.updatedAt).toLocaleString()}</p>
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

export default BookingsTable;