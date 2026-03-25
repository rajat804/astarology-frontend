// src/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlinePlus,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineFilter,
  HiOutlineDownload,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiOutlineCog,
  HiOutlineEye,
  HiOutlineChevronDown,
} from "react-icons/hi";
import {
  FaChartLine,
  FaBoxOpen,
  FaBook,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import AdminRoute from "./AdminRoute";
import { useNavigate } from "react-router-dom";

function useCount(to = 0, duration = 1200) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (now) => {
      const prog = Math.min((now - start) / duration, 1);
      setNum(Math.round(prog * to));
      if (prog < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return num;
}

const initialServices = [
  { id: 1, title: "Natal Chart Reading", price: 2499, category: "Astrology", status: "active" },
  { id: 2, title: "Numerology Report", price: 1299, category: "Numerology", status: "active" },
  { id: 3, title: "Vastu Consultation", price: 3999, category: "Vastu", status: "active" },
];
const initialProducts = [
  { id: 1, name: "Premium Rudraksh Mala", price: 1799, stock: 24, sold: 156, rating: 4.8 },
  { id: 2, name: "Clear Quartz Cluster", price: 1299, stock: 12, sold: 89, rating: 4.7 },
  { id: 3, name: "Copper Yantra Plate", price: 2199, stock: 8, sold: 67, rating: 4.9 },
];
const initialClasses = [
  { id: 1, title: "Vedic Numerology - Beginner", seats: 24, enrolled: 10, status: "active" },
  { id: 2, title: "Yoga for Balance", seats: 18, enrolled: 14, status: "active" },
  { id: 3, title: "Advanced Astrology", seats: 12, enrolled: 8, status: "active" },
];
const initialBookings = [
  { id: 1, user: "Anjali K", service: "Natal Chart Reading", date: "2025-10-12", status: "Booked", amount: 2499 },
  { id: 2, user: "Rohit S", service: "Numerology Report", date: "2025-10-16", status: "Completed", amount: 1299 },
  { id: 3, user: "Priya M", service: "Vastu Consultation", date: "2025-10-20", status: "Booked", amount: 3999 },
];
const initialUsers = [
  { id: 1, name: "Anjali K", email: "anjali@example.com", joined: "2025-01-15", status: "active" },
  { id: 2, name: "Rohit S", email: "rohit@example.com", joined: "2025-02-20", status: "active" },
  { id: 3, name: "Priya M", email: "priya@example.com", joined: "2025-03-10", status: "active" },
];

export default function AdminDashboardShell() {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}

function AdminDashboard() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tab, setTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New booking from Anjali K", time: "5 min ago", read: false },
    { id: 2, message: "Product stock low: Copper Yantra Plate", time: "1 hour ago", read: false },
    { id: 3, message: "New user registered: Rahul M", time: "2 hours ago", read: true },
  ]);

  const [services, setServices] = useState(initialServices);
  const [products, setProducts] = useState(initialProducts);
  const [classes, setClasses] = useState(initialClasses);
  const [bookings, setBookings] = useState(initialBookings);
  const [users, setUsers] = useState(initialUsers);
  const [content, setContent] = useState([]);

  const totalRevenue = useMemo(() => {
    return products.reduce((s, p) => s + (p.price * p.sold || 0), 0) + 
           bookings.reduce((s, b) => s + (b.status === "Completed" ? b.amount : 0), 0);
  }, [products, bookings]);
  
  const revenueCount = useCount(Math.round(totalRevenue / 1000));
  const usersCount = useCount(users.length);
  const bookingsCount = useCount(bookings.length);
  const productsCount = useCount(products.length);

  const logout = () => {
    localStorage.removeItem("astro_admin");
    nav("/");
  };

  // Filtered data based on search
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => 
      b.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookings, searchQuery]);

  const sidebarItems = [
    { key: "overview", label: "Overview", icon: <FaChartLine />, color: "text-red-500" },
    { key: "services", label: "Services", icon: <FaBook />, color: "text-red-500" },
    { key: "products", label: "Products", icon: <FaBoxOpen />, color: "text-red-500" },
    { key: "classes", label: "Classes", icon: <HiOutlineUserCircle />, color: "text-red-500" },
    { key: "bookings", label: "Bookings", icon: <HiOutlineCalendar />, color: "text-red-500" },
    { key: "content", label: "Content", icon: <HiOutlineDocumentText />, color: "text-red-500" },
    { key: "reports", label: "Reports", icon: <HiOutlineChartBar />, color: "text-red-500" },
    { key: "users", label: "Users", icon: <HiOutlineUsers />, color: "text-red-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-offWhite flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Top Bar */}
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

        {/* Main Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {tab === "overview" && (
              <motion.section
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <StatCard title="Revenue" value={`₹${revenueCount}K`} subtitle="Total earnings" icon={<FaChartLine />} color="red" />
                  <StatCard title="Users" value={usersCount} subtitle="Registered users" icon={<HiOutlineUsers />} color="orange" />
                  <StatCard title="Bookings" value={bookingsCount} subtitle="Active bookings" icon={<HiOutlineCalendar />} color="red" />
                  <StatCard title="Products" value={productsCount} subtitle="In catalog" icon={<FaBoxOpen />} color="orange" />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">Revenue Overview</h4>
                      <HiOutlineDownload className="text-gray-400 cursor-pointer hover:text-red-500" />
                    </div>
                    <RevenueChart />
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-4">Recent Bookings</h4>
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((b) => (
                        <div key={b.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                          <div>
                            <div className="font-medium text-gray-800">{b.user}</div>
                            <div className="text-xs text-gray-500">{b.service} • {b.date}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === "Booked" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                            }`}>
                              {b.status}
                            </span>
                            <span className="text-sm font-semibold text-gray-700">₹{b.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-3">Top Product</h4>
                    <div className="text-2xl font-bold text-red-600">Premium Rudraksh Mala</div>
                    <div className="text-sm text-gray-500 mt-1">156 units sold</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-3">Popular Service</h4>
                    <div className="text-2xl font-bold text-red-600">Natal Chart Reading</div>
                    <div className="text-sm text-gray-500 mt-1">Highest bookings</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-3">Active Users</h4>
                    <div className="text-2xl font-bold text-red-600">{users.length}</div>
                    <div className="text-sm text-gray-500 mt-1">Total registered</div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Products Tab */}
            {tab === "products" && (
              <motion.section
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Products & Inventory</h3>
                  <ProductForm onAdd={(p) => setProducts([p, ...products])} />
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-orange-50">
                        <tr className="text-left text-sm text-gray-600">
                          <th className="px-6 py-4">Product</th>
                          <th className="px-6 py-4">Price</th>
                          <th className="px-6 py-4">Stock</th>
                          <th className="px-6 py-4">Sold</th>
                          <th className="px-6 py-4">Rating</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-orange-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                  <FaBoxOpen className="text-red-500" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{p.name}</div>
                                  <div className="text-xs text-gray-500">SKU: {p.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-800">₹{p.price}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                p.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                              }`}>
                                {p.stock} units
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{p.sold}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-500" />
                                <span className="text-gray-600">{p.rating}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100">
                                  <HiOutlinePencilAlt className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                                  <HiOutlineTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Bookings Tab */}
            {tab === "bookings" && (
              <motion.section
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Bookings Management</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200">
                    <HiOutlineDownload /> Export
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-orange-50">
                        <tr className="text-left text-sm text-gray-600">
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-orange-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-800">{b.user}</td>
                            <td className="px-6 py-4 text-gray-600">{b.service}</td>
                            <td className="px-6 py-4 text-gray-600">{b.date}</td>
                            <td className="px-6 py-4 font-semibold text-gray-800">₹{b.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                b.status === "Booked" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                              }`}>
                                {b.status === "Booked" ? <HiOutlineCalendar className="w-3 h-3" /> : <FaCheckCircle className="w-3 h-3" />}
                                {b.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100">
                                  <FaCheckCircle className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                                  <FaTimesCircle className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Users Tab */}
            {tab === "users" && (
              <motion.section
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-lg">
                      <HiOutlineFilter /> Filter
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-orange-50">
                        <tr className="text-left text-sm text-gray-600">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Joined</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-100">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-orange-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {u.name.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-800">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{u.email}</td>
                            <td className="px-6 py-4 text-gray-600">{u.joined}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                {u.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-orange-50 text-orange-600">
                                  <HiOutlineEye className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-red-50 text-red-600">
                                  <HiOutlineTrash className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Other tabs (Services, Classes, Content, Reports) - Similar structure */}
            {["services", "classes", "content", "reports"].includes(tab) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-orange-100 p-12 text-center"
              >
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
                <p className="text-gray-500">The {tab} management interface is under development.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, subtitle, icon, color }) {
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
}

function RevenueChart() {
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
}

function ProductForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(10);

  const submit = () => {
    if (!name || !price) return;
    onAdd({ id: Date.now(), name, price: Number(price), stock: Number(stock), sold: 0, rating: 0 });
    setName(""); setPrice(""); setStock(10);
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition">
        <HiOutlinePlus /> Add Product
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-gray-800">Add New Product</h4>
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    placeholder="e.g., Rudraksh Mala"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="1999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setOpen(false)} className="flex-1 px-4 py-2 border border-orange-200 rounded-xl text-gray-600 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button onClick={submit} className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-md">
                    Create Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}