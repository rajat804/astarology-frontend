import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiOutlineBell } from "react-icons/hi";

const TopBar = ({ searchQuery, setSearchQuery, tab, notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{tab}</h1>
          <p className="text-sm text-gray-500">Manage your {tab} settings and data</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-red-50 relative"
            >
              <HiOutlineBell className="w-5 h-5 text-gray-600" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-orange-100 z-50"
                >
                  <div className="p-3 border-b border-orange-100">
                    <h4 className="font-semibold">Notifications</h4>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-3 border-b border-orange-50 hover:bg-orange-50 ${!notif.read ? 'bg-red-50' : ''}`}>
                        <p className="text-sm text-gray-700">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 border-l pl-4 border-orange-200">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-800">Admin</div>
              <div className="text-xs text-gray-500">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;