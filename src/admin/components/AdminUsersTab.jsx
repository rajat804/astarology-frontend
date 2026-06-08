import React, { useState, useEffect } from 'react';
import { 
  HiOutlineEye, 
  HiOutlineTrash, 
  HiOutlineRefresh, 
  HiOutlineSearch,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineShoppingBag,
  HiOutlineCreditCard,
  HiOutlineUser
} from 'react-icons/hi';
import { GiCrystalBall } from 'react-icons/gi';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedUser, setExpandedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const [updatingUser, setUpdatingUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    totalBookings: 0,
    totalRevenue: 0
  });

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/admin/users`);
      
      console.log('API Response:', response.data);
      
      let usersData = [];
      
      if (response.data) {
        if (response.data.users && Array.isArray(response.data.users)) {
          usersData = response.data.users;
        }
        else if (response.data.data && Array.isArray(response.data.data)) {
          usersData = response.data.data;
        }
        else if (Array.isArray(response.data)) {
          usersData = response.data;
        }
      }
      
      setUsers(usersData);
      calculateStats(usersData);
      
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (usersData) => {
    const active = usersData.filter(u => u.isActive !== false).length;
    const inactive = usersData.filter(u => u.isActive === false).length;
    
    let totalBookings = 0;
    let totalRevenue = 0;
    
    usersData.forEach(user => {
      if (user.bookings && Array.isArray(user.bookings)) {
        totalBookings += user.bookings.length;
        
        const userRevenue = user.bookings
          .filter(b => b.status === 'confirmed' || b.status === 'completed')
          .reduce((sum, b) => sum + (b.servicePrice || 0), 0);
        totalRevenue += userRevenue;
      }
    });
    
    setStats({
      total: usersData.length,
      active,
      inactive,
      totalBookings,
      totalRevenue
    });
  };

  // Update user status
  const updateUserStatus = async (userId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'block' : 'unblock'} this user?`)) return;
    
    setUpdatingUser(userId);
    try {
      const response = await axios.put(`${API_URL}/admin/users/${userId}`, {
        isActive: !currentStatus
      });
      
      if (response.data && response.data.success) {
        setUsers(prev => prev.map(user => 
          user._id === userId 
            ? { ...user, isActive: !currentStatus }
            : user
        ));
        
        const updatedUsers = users.map(user => 
          user._id === userId ? { ...user, isActive: !currentStatus } : user
        );
        calculateStats(updatedUsers);
        
        alert(`User ${currentStatus ? 'blocked' : 'unblocked'} successfully`);
      }
    } catch (err) {
      console.error('Error updating user status:', err);
      alert('Failed to update user status');
    } finally {
      setUpdatingUser(null);
    }
  };

  // Delete user
  const deleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone!`)) return;
    
    try {
      const response = await axios.delete(`${API_URL}/admin/users/${userId}`);
      
      if (response.data && response.data.success) {
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        calculateStats(updatedUsers);
        
        alert('User deleted successfully');
        if (expandedUser === userId) {
          setExpandedUser(null);
        }
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  // Filter users
  const getFilteredUsers = () => {
    let filtered = [...users];
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        (user.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(user => user.isActive === isActive);
    }
    
    return filtered;
  };

  const getBookingStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Render Saved Charts
  const renderSavedCharts = (user) => {
    const charts = user.savedCharts || [];
    
    if (charts.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No saved charts found
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {charts.map((chart, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <GiCrystalBall className="text-purple-600" />
              <h4 className="font-semibold text-gray-800">Chart {index + 1}</h4>
            </div>
            <pre className="text-xs text-gray-600 overflow-auto bg-white p-3 rounded max-h-96">
              {JSON.stringify(chart, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    );
  };

  // Render Bookings
  const renderBookings = (user) => {
    const bookings = user.bookings || [];
    
    if (bookings.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          No bookings found
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {bookings.map((booking, index) => (
          <div key={booking._id || index} className="bg-white rounded-lg p-4 border border-orange-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">{booking.serviceName}</h4>
                <p className="text-xs text-gray-500 font-mono">Booking ID: {booking._id?.slice(-8).toUpperCase() || 'N/A'}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                {booking.status?.toUpperCase() || 'PENDING'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-gray-700">
                  {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-gray-700">{booking.bookingTime || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-gray-700 font-semibold">₹{booking.servicePrice || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Booked On</p>
                <p className="text-gray-700 text-xs">
                  {booking.bookedAt ? new Date(booking.bookedAt).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-600">{booking.notes}</p>
              </div>
            )}
            
            {booking.paymentId && (
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <HiOutlineCreditCard className="w-3 h-3" />
                <span>Payment ID: {booking.paymentId}</span>
                {booking.orderId && <span>| Order ID: {booking.orderId}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = getFilteredUsers();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      key="users"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-4 text-white">
          <p className="text-sm opacity-90">Total Users</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-4 text-white">
          <p className="text-sm opacity-90">Active Users</p>
          <p className="text-2xl font-bold">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow p-4 text-white">
          <p className="text-sm opacity-90">Blocked Users</p>
          <p className="text-2xl font-bold">{stats.inactive}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-4 text-white">
          <p className="text-sm opacity-90">Total Bookings</p>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow p-4 text-white">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Blocked Users</option>
          </select>
          
          <button
            onClick={fetchUsers}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            <HiOutlineRefresh className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Bookings</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {filteredUsers.map((user) => (
                  <React.Fragment key={user._id}>
                    <tr className="hover:bg-orange-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {(user.fullName || user.email || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{user.fullName || 'N/A'}</div>
                            <div className="text-xs text-gray-500 font-mono">ID: {user._id?.slice(-8).toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <HiOutlineMail className="text-gray-400" />
                          <span className="text-gray-600">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setExpandedUser(expandedUser === user._id ? null : user._id);
                            setActiveTab('bookings');
                          }}
                          className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                        >
                          <HiOutlineShoppingBag className="w-4 h-4" />
                          <span className="font-semibold">{user.bookings?.length || 0} bookings</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive !== false 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.isActive !== false ? 'Active' : 'Blocked'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setExpandedUser(expandedUser === user._id ? null : user._id);
                              setActiveTab('bookings');
                            }}
                            className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                            title="View Details"
                          >
                            <HiOutlineEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateUserStatus(user._id, user.isActive !== false)}
                            disabled={updatingUser === user._id}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              user.isActive !== false
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                          >
                            {updatingUser === user._id ? '...' : (user.isActive !== false ? 'Block' : 'Unblock')}
                          </button>
                          <button
                            onClick={() => deleteUser(user._id, user.fullName || user.email)}
                            className="px-3 py-1 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded User Details */}
                    {expandedUser === user._id && (
                      <tr className="bg-orange-50/30">
                        <td colSpan="6" className="px-6 py-6">
                          <div className="space-y-6">
                            {/* Tabs - Only Bookings and Charts */}
                            <div className="flex gap-2 border-b border-orange-200 pb-2">
                              <button
                                onClick={() => setActiveTab('bookings')}
                                className={`px-4 py-2 rounded-lg transition ${
                                  activeTab === 'bookings'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                📅 Bookings ({user.bookings?.length || 0})
                              </button>
                              <button
                                onClick={() => setActiveTab('charts')}
                                className={`px-4 py-2 rounded-lg transition ${
                                  activeTab === 'charts'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                📊 Saved Charts ({user.savedCharts?.length || 0})
                              </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'bookings' && renderBookings(user)}
                            {activeTab === 'charts' && renderSavedCharts(user)}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AdminUsersTab;