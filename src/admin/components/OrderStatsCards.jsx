import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineCurrencyRupee, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi';

const OrderStatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <HiOutlineShoppingBag className="w-6 h-6" />,
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
      value: stats?.pendingOrders || 0,
      icon: <HiOutlineClock className="w-6 h-6" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      title: 'Delivered',
      value: stats?.deliveredOrders || 0,
      icon: <HiOutlineCheckCircle className="w-6 h-6" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bgColor} ${card.textColor}`}>
              {card.icon}
            </div>
            <span className="text-2xl font-bold text-gray-800">{card.value}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderStatsCards;