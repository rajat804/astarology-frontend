import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminRoute from "./AdminRoute";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import OverviewStats from "./components/OverviewStats";
import RevenueChart from "./components/RevenueChart";
import RecentBookings from "./components/RecentBookings";
import ProductsTable from "./components/ProductsTable";
import ProductFormModal from "./components/ProductFormModal";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductStats 
} from "../services/api";

// Static data for other tabs
const initialServices = [
  { id: 1, title: "Natal Chart Reading", price: 2499, category: "Astrology", status: "active" },
  { id: 2, title: "Numerology Report", price: 1299, category: "Numerology", status: "active" },
  { id: 3, title: "Vastu Consultation", price: 3999, category: "Vastu", status: "active" },
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
  const [notifications] = useState([
    { id: 1, message: "New booking from Anjali K", time: "5 min ago", read: false },
    { id: 2, message: "Product stock low: Copper Yantra Plate", time: "1 hour ago", read: false },
    { id: 3, message: "New user registered: Rahul M", time: "2 hours ago", read: true },
  ]);

  const [services] = useState(initialServices);
  const [products, setProducts] = useState([]);
  const [productStats, setProductStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [classes] = useState(initialClasses);
  const [bookings] = useState(initialBookings);
  const [users] = useState(initialUsers);

  useEffect(() => {
    fetchProducts();
    fetchProductStats();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductStats = async () => {
    try {
      const stats = await getProductStats();
      setProductStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      const result = await createProduct(productData);
      setProducts([result.product, ...products]);
      toast.success('Product created successfully');
      setShowProductModal(false);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.msg || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const result = await updateProduct(id, productData);
      setProducts(products.map(p => p._id === id ? result.product : p));
      toast.success('Product updated successfully');
      setEditingProduct(null);
      setShowProductModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.msg || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.response?.data?.msg || 'Failed to delete product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const totalRevenue = products.reduce((s, p) => s + (p.price * p.sold || 0), 0) + 
           bookings.reduce((s, b) => s + (b.status === "Completed" ? b.amount : 0), 0);
  
  const revenueCount = useCount(Math.round(totalRevenue / 1000));
  const usersCount = useCount(users.length);
  const bookingsCount = useCount(bookings.length);
  const productsCount = useCount(products.length);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");
    toast.success('Logged out successfully');
    nav("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-offWhite flex">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        tab={tab}
        setTab={setTab}
        logout={logout}
      />

      <div className="flex-1 overflow-x-hidden">
        <TopBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tab={tab}
          notifications={notifications}
        />

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
                <OverviewStats 
                  revenueCount={revenueCount}
                  usersCount={usersCount}
                  bookingsCount={bookingsCount}
                  productsCount={productsCount}
                />

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-4">Revenue Overview</h4>
                    <RevenueChart />
                  </div>
                  <RecentBookings bookings={bookings} />
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-100">
                    <h4 className="font-semibold text-gray-800 mb-3">Top Product</h4>
                    <div className="text-2xl font-bold text-red-600">
                      {productStats?.topProducts?.[0]?.name || 'Loading...'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {productStats?.topProducts?.[0]?.sold || 0} units sold
                    </div>
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
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Products & Inventory</h3>
                    {productStats && (
                      <p className="text-sm text-gray-500 mt-1">
                        Total: {productStats.totalProducts} | Low Stock: {productStats.lowStock} | Out of Stock: {productStats.outOfStock}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={handleAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition"
                  >
                    <span>+</span> Add Product
                  </button>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <ProductsTable 
                    products={products}
                    searchQuery={searchQuery}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteProduct}
                  />
                )}
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
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-orange-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-800">{b.user}</td>
                            <td className="px-6 py-4 text-gray-600">{b.service}</td>
                            <td className="px-6 py-4 text-gray-600">{b.date}</td>
                            <td className="px-6 py-4 font-semibold text-gray-800">₹{b.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                b.status === "Booked" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100">
                                  Complete
                                </button>
                                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                                  Cancel
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
                                  View
                                </button>
                                <button className="p-2 rounded-lg bg-red-50 text-red-600">
                                  Block
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

            {/* Other tabs placeholder */}
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

      <ProductFormModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        editingProduct={editingProduct}
        onCreate={handleCreateProduct}
        onUpdate={handleUpdateProduct}
      />
    </div>
  );
}