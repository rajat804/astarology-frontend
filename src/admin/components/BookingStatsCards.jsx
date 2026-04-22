import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineCurrencyRupee } from 'react-icons/hi';

const BookingStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      icon: <HiOutlineCalendar className="w-6 h-6" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: <HiOutlineCurrencyRupee className="w-6 h-6" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Pending',
      value: stats?.pendingBookings || 0,
      icon: <HiOutlineClock className="w-6 h-6" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Confirmed',
      value: stats?.confirmedBookings || 0,
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Completed',
      value: stats?.completedBookings || 0,
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Cancelled',
      value: stats?.cancelledBookings || 0,
      icon: <HiOutlineXCircle className="w-6 h-6" />,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-xl ${card.bgColor} ${card.textColor}`}>
              {card.icon}
            </div>
            <span className="text-xl font-bold text-gray-800">{card.value}</span>
          </div>
          <h3 className="text-xs font-medium text-gray-600">{card.title}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default BookingStatsCards;