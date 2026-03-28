import React from "react";
import { motion } from "framer-motion";

const RevenueChart = () => {
  const data = [42, 65, 48, 78, 62, 89, 95, 72, 84, 68, 91, 108];
  const max = Math.max(...data);
  
  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d / max) * 100}%` }}
            transition={{ duration: 1, delay: i * 0.05 }}
            className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg"
            style={{ height: `${(d / max) * 100}%`, minHeight: 4 }}
          />
          <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueChart;