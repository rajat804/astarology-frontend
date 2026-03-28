import React from "react";
import { motion } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi";

const StatCard = ({ title, value, subtitle, icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-500`}>
          {icon}
        </div>
        <HiOutlineChevronDown className="text-gray-300" />
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </motion.div>
  );
};

export default StatCard;