import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaBoxOpen } from "react-icons/fa";
import { HiOutlineUsers, HiOutlineCalendar } from "react-icons/hi";
import StatCard from "./StatCard";

const OverviewStats = ({ revenueCount, usersCount, bookingsCount, productsCount }) => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Revenue" 
        value={`₹${revenueCount}K`} 
        subtitle="Total earnings" 
        icon={<FaChartLine />} 
        color="red" 
      />
      <StatCard 
        title="Users" 
        value={usersCount} 
        subtitle="Registered users" 
        icon={<HiOutlineUsers />} 
        color="orange" 
      />
      <StatCard 
        title="Bookings" 
        value={bookingsCount} 
        subtitle="Active bookings" 
        icon={<HiOutlineCalendar />} 
        color="red" 
      />
      <StatCard 
        title="Products" 
        value={productsCount} 
        subtitle="In catalog" 
        icon={<FaBoxOpen />} 
        color="orange" 
      />
    </div>
  );
};

export default OverviewStats;