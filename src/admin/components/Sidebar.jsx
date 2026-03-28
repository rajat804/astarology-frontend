import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineLogout } from "react-icons/hi";
import { FaChartLine, FaBoxOpen, FaBook } from "react-icons/fa";
import {
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineUsers,
} from "react-icons/hi";

const Sidebar = ({ sidebarOpen, setSidebarOpen, tab, setTab, logout }) => {
  const sidebarItems = [
    { key: "overview", label: "Overview", icon: <FaChartLine /> },
    { key: "services", label: "Services", icon: <FaBook /> },
    { key: "products", label: "Products", icon: <FaBoxOpen /> },
    { key: "classes", label: "Classes", icon: <HiOutlineUserCircle /> },
    { key: "bookings", label: "Bookings", icon: <HiOutlineCalendar /> },
    { key: "content", label: "Content", icon: <HiOutlineDocumentText /> },
    { key: "reports", label: "Reports", icon: <HiOutlineChartBar /> },
    { key: "users", label: "Users", icon: <HiOutlineUsers /> },
  ];

  return (
    <motion.aside 
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className="bg-white border-r border-orange-100 shadow-lg relative z-20"
    >
      <div className="sticky top-0">
        <div className="p-5 flex items-center justify-between border-b border-orange-100">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-2">
              <FaChartLine className="w-5 h-5" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <div className="text-lg font-bold text-gray-800">AstroPanel</div>
                  <div className="text-xs text-gray-500">Admin Dashboard</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-lg hover:bg-red-50 transition"
          >
            <HiOutlineMenu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                tab === item.key
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <div className={`w-5 h-5 ${tab === item.key ? "text-red-500" : ""}`}>
                {item.icon}
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;