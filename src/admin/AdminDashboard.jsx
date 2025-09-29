// src/admin/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlinePlus,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import { FaUsers, FaChartLine, FaBoxOpen, FaBook } from "react-icons/fa";
import AdminRoute from "./AdminRoute";
import { useNavigate } from "react-router-dom";

/**
 * Admin dashboard — mock CRUD + reports.
 * Replace mock handlers with API calls to your backend.
 */

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
  { id: 1, title: "Natal Chart Reading", price: 2499, category: "Astrology" },
  { id: 2, title: "Numerology Report", price: 1299, category: "Numerology" },
];
const initialProducts = [
  { id: 1, name: "Premium Rudraksh Mala", price: 1799, stock: 24 },
  { id: 2, name: "Clear Quartz Cluster", price: 1299, stock: 12 },
];
const initialClasses = [
  { id: 1, title: "Vedic Numerology - Beginner", seats: 24, enrolled: 10 },
  { id: 2, title: "Yoga for Balance", seats: 18, enrolled: 14 },
];
const initialBookings = [
  { id: 1, user: "Anjali K", service: "Natal Chart Reading", date: "2025-10-12", status: "Booked" },
  { id: 2, user: "Rohit S", service: "Numerology Report", date: "2025-10-16", status: "Completed" },
];
const initialUsers = [
  { id: 1, name: "Anjali K", email: "anjali@example.com" },
  { id: 2, name: "Rohit S", email: "rohit@example.com" },
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
  const [tab, setTab] = useState("overview"); // overview, services, products, classes, bookings, content, reports, users
  const [services, setServices] = useState(initialServices);
  const [products, setProducts] = useState(initialProducts);
  const [classes, setClasses] = useState(initialClasses);
  const [bookings, setBookings] = useState(initialBookings);
  const [users, setUsers] = useState(initialUsers);
  const [content, setContent] = useState([]); // uploaded content list

  // simple stats
  const totalRevenue = useMemo(() => products.reduce((s, p) => s + (p.price * (p.stock || 0)), 0) + services.reduce((s, svc) => s + svc.price * 5, 0), [products, services]);
  const revenueCount = useCount(Math.round(totalRevenue / 1000));
  const usersCount = useCount(users.length);
  const bookingsCount = useCount(bookings.length);

  // Admin actions
  const logout = () => {
    localStorage.removeItem("astro_admin");
    nav("/");
  };

  // Services CRUD
  const addService = (payload) => {
    setServices((s) => [{ id: Date.now(), ...payload }, ...s]);
  };
  const updateService = (id, payload) => setServices((s) => s.map((it) => (it.id === id ? { ...it, ...payload } : it)));
  const deleteService = (id) => setServices((s) => s.filter((it) => it.id !== id));

  // Products CRUD / inventory
  const addProduct = (payload) => setProducts((p) => [{ id: Date.now(), ...payload }, ...p]);
  const updateProduct = (id, payload) => setProducts((p) => p.map((it) => (it.id === id ? { ...it, ...payload } : it)));
  const deleteProduct = (id) => setProducts((p) => p.filter((it) => it.id !== id));

  // Classes CRUD
  const addClass = (payload) => setClasses((c) => [{ id: Date.now(), ...payload }, ...c]);
  const updateClass = (id, payload) => setClasses((c) => c.map((it) => (it.id === id ? { ...it, ...payload } : it)));
  const deleteClass = (id) => setClasses((c) => c.filter((it) => it.id !== id));

  // Bookings CRUD
  const updateBookingStatus = (id, status) => setBookings((b) => b.map((bk) => (bk.id === id ? { ...bk, status } : bk)));
  const cancelBooking = (id) => setBookings((b) => b.filter((bk) => bk.id !== id));

  // Content upload handler
  const onUploadContent = (file, title, type, description) => {
    // For demo we just store metadata
    const c = { id: Date.now(), title, type, filename: file?.name || "", description, uploadedAt: new Date().toISOString() };
    setContent((arr) => [c, ...arr]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-orange-50 ${sidebarOpen ? "w-64" : "w-16"} transition-all`}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 rounded-lg p-2">
              <FaChartLine />
            </div>
            <div className={`${sidebarOpen ? "block" : "hidden"}`}>
              <div className="text-sm font-bold">AstroPanel</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen((s) => !s)} className="p-2 rounded hover:bg-orange-50">
            <HiOutlineMenu />
          </button>
        </div>

        <nav className="mt-4">
          {[
            { key: "overview", label: "Overview", icon: <FaChartLine /> },
            { key: "services", label: "Services", icon: <FaBook /> },
            { key: "products", label: "Products", icon: <FaBoxOpen /> },
            { key: "classes", label: "Classes", icon: <HiOutlineUserCircle /> },
            { key: "bookings", label: "Bookings", icon: <FaBook /> },
            { key: "content", label: "Content", icon: <FaBook /> },
            { key: "reports", label: "Reports", icon: <FaChartLine /> },
            { key: "users", label: "Users", icon: <FaUsers /> },
          ].map((it) => (
            <button
              key={it.key}
              onClick={() => setTab(it.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-orange-50 ${tab === it.key ? "bg-orange-50" : ""}`}
            >
              <div className="w-6 text-orange-500">{it.icon}</div>
              <div className={`${sidebarOpen ? "block" : "hidden"}`}>{it.label}</div>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* topbar */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-900 capitalize">{tab}</div>
            <div className="hidden md:block text-sm text-gray-500">Admin dashboard</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input placeholder="Search..." className="px-3 py-2 rounded-lg border border-gray-200 outline-none w-60" />
              <HiOutlineSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            <button className="p-2 rounded hover:bg-orange-50"><HiOutlineBell /></button>
            <div className="flex items-center gap-2 border-l pl-3">
              <div className="text-sm text-gray-700">Admin</div>
              <button onClick={logout} className="p-2 rounded hover:bg-orange-50 text-gray-600"><HiOutlineLogout /></button>
            </div>
          </div>
        </header>

        {/* content area */}
        <main className="p-6">
          {/* Overview */}
          {tab === "overview" && (
            <section>
              <div className="grid md:grid-cols-4 gap-4">
                <StatCard title="Revenue (k)" value={`${revenueCount}k`} subtitle="Total inventory + services" />
                <StatCard title="Users" value={usersCount} subtitle="Registered users" />
                <StatCard title="Bookings" value={bookingsCount} subtitle="Active bookings" />
                <StatCard title="Products" value={products.length} subtitle="Items in catalog" />
              </div>

              <div className="mt-6 grid lg:grid-cols-2 gap-6">
                {/* Simple revenue chart (bar style) */}
                <div className="bg-white rounded-2xl p-6 shadow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Revenue by month</h4>
                    <div className="text-sm text-gray-500">Last 6 months</div>
                  </div>
                  <SimpleBarChart />
                </div>

                {/* Recent activity */}
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h4 className="font-semibold">Recent Bookings</h4>
                  <ul className="mt-4 space-y-3">
                    {bookings.slice(0, 6).map((b) => (
                      <li key={b.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{b.user}</div>
                          <div className="text-xs text-gray-500">{b.service} • {b.date}</div>
                        </div>
                        <div>
                          <span className={`text-xs px-2 py-1 rounded ${b.status === "Booked" ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"}`}>{b.status}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Services management */}
          {tab === "services" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Manage Services</h3>
                <ServiceForm onAdd={addService} />
              </div>

              <div className="bg-white rounded-2xl p-4 shadow">
                <table className="w-full text-left">
                  <thead className="text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="py-3">Title</th>
                      <th className="py-3">Category</th>
                      <th className="py-3">Price</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s.id} className="border-t">
                        <td className="py-3">{s.title}</td>
                        <td className="py-3 text-sm text-gray-500">{s.category}</td>
                        <td className="py-3">₹{s.price}</td>
                        <td className="py-3">
                          <button onClick={() => { const title = prompt("Edit title", s.title); if (title) updateService(s.id, { title }); }} className="mr-2 p-2 rounded bg-orange-50 text-orange-600"><HiOutlinePencilAlt /></button>
                          <button onClick={() => deleteService(s.id)} className="p-2 rounded bg-red-50 text-red-600"><HiOutlineTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Products / Inventory control */}
          {tab === "products" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Products & Inventory</h3>
                <ProductForm onAdd={addProduct} />
              </div>

              <div className="bg-white rounded-2xl p-4 shadow overflow-x-auto">
                <table className="w-full text-left min-w-[780px]">
                  <thead className="text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="py-3">Product</th>
                      <th className="py-3">Price</th>
                      <th className="py-3">Stock</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-50 rounded-md flex items-center justify-center text-orange-600">📿</div>
                            <div>
                              <div className="font-medium">{p.name}</div>
                              <div className="text-xs text-gray-500">SKU: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">₹{p.price}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                              className="w-20 px-2 py-1 border rounded"
                            />
                            <button onClick={() => updateProduct(p.id, { stock: p.stock + 1 })} className="px-2 py-1 rounded bg-orange-50">+1</button>
                          </div>
                        </td>
                        <td className="py-3">
                          <button onClick={() => { const name = prompt("Edit product name", p.name); if (name) updateProduct(p.id, { name }); }} className="mr-2 p-2 rounded bg-orange-50 text-orange-600"><HiOutlinePencilAlt /></button>
                          <button onClick={() => deleteProduct(p.id)} className="p-2 rounded bg-red-50 text-red-600"><HiOutlineTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Classes */}
          {tab === "classes" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Manage Classes</h3>
                <ClassForm onAdd={addClass} />
              </div>

              <div className="bg-white rounded-2xl p-4 shadow">
                <table className="w-full text-left">
                  <thead className="text-xs text-gray-500 uppercase">
                    <tr><th className="py-3">Title</th><th className="py-3">Seats</th><th className="py-3">Enrolled</th><th className="py-3">Actions</th></tr>
                  </thead>
                  <tbody>
                    {classes.map((c) => (
                      <tr key={c.id} className="border-t">
                        <td className="py-3">{c.title}</td>
                        <td className="py-3">{c.seats}</td>
                        <td className="py-3">{c.enrolled}</td>
                        <td className="py-3">
                          <button onClick={() => { const title = prompt("Edit title", c.title); if (title) updateClass(c.id, { title }); }} className="mr-2 p-2 rounded bg-orange-50 text-orange-600"><HiOutlinePencilAlt /></button>
                          <button onClick={() => deleteClass(c.id)} className="p-2 rounded bg-red-50 text-red-600"><HiOutlineTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Bookings */}
          {tab === "bookings" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Bookings</h3>
                <div className="text-sm text-gray-500">Manage upcoming bookings and statuses</div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow">
                <table className="w-full text-left">
                  <thead className="text-xs text-gray-500 uppercase">
                    <tr><th className="py-3">User</th><th className="py-3">Service</th><th className="py-3">Date</th><th className="py-3">Status</th><th className="py-3">Actions</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-t">
                        <td className="py-3">{b.user}</td>
                        <td className="py-3">{b.service}</td>
                        <td className="py-3">{b.date}</td>
                        <td className="py-3">{b.status}</td>
                        <td className="py-3">
                          <button onClick={() => updateBookingStatus(b.id, "Completed")} className="mr-2 p-2 rounded bg-green-50 text-green-600">Complete</button>
                          <button onClick={() => cancelBooking(b.id)} className="p-2 rounded bg-red-50 text-red-600">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Content upload (educational) */}
          {tab === "content" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Educational Content</h3>
                <div className="text-sm text-gray-500">Upload videos, PDFs, lessons</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <ContentUploader onUpload={onUploadContent} />
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Uploaded Items</h4>
                  <ul className="space-y-3">
                    {content.length === 0 && <div className="text-sm text-gray-500">No content uploaded yet.</div>}
                    {content.map((c) => (
                      <li key={c.id} className="border rounded p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.title}</div>
                          <div className="text-xs text-gray-500">{c.type} • {c.filename} • {new Date(c.uploadedAt).toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 rounded bg-orange-50 text-orange-600">View</button>
                          <button onClick={() => setContent((arr) => arr.filter((x) => x.id !== c.id))} className="px-2 py-1 rounded bg-red-50 text-red-600">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Reports */}
          {tab === "reports" && (
            <section>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h4 className="font-semibold mb-3">Users Growth</h4>
                  <SimpleLineChart />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h4 className="font-semibold mb-3">Top Services</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-700">
                    {services.map((s, i) => <li key={s.id}>{s.title} — ₹{s.price}</li>)}
                  </ol>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow">
                  <h4 className="font-semibold mb-3">Engagement</h4>
                  <div className="text-sm text-gray-500">Avg session duration, click-throughs, newsletter signups — (simulated)</div>
                  <div className="mt-4">
                    <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div className="h-2 bg-orange-500 rounded-full" style={{ width: "62%" }} />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Conversion rate: 6.2%</div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Users */}
          {tab === "users" && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Users</h3>
              <div className="bg-white rounded-2xl p-4 shadow">
                <table className="w-full text-left">
                  <thead className="text-xs text-gray-500 uppercase"><tr><th className="py-3">Name</th><th className="py-3">Email</th><th className="py-3">Actions</th></tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-t"><td className="py-3">{u.name}</td><td className="py-3">{u.email}</td><td className="py-3"><button className="px-3 py-1 rounded bg-red-50 text-red-600" onClick={() => setUsers((arr) => arr.filter(x => x.id !== u.id))}>Remove</button></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------------- Small helper components ---------------------- */

function StatCard({ title, value, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
    </motion.div>
  );
}

/* Simple bar chart built with divs (mock data) */
function SimpleBarChart() {
  const data = [120, 160, 90, 200, 140, 180]; // arbitrary values
  const max = Math.max(...data);
  return (
    <div className="mt-6 flex items-end gap-3 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1">
          <div className="h-full flex items-end">
            <div className="bg-orange-500 rounded-t-md" style={{ height: `${(d / max) * 100}%` }} />
          </div>
          <div className="text-xs text-center text-gray-500 mt-2">{["Apr", "May", "Jun", "Jul", "Aug", "Sep"][i]}</div>
        </div>
      ))}
    </div>
  );
}

/* Simple line chart (SVG) */
function SimpleLineChart() {
  const points = [10, 30, 20, 50, 30, 70].map((v, i) => [i * 20, 100 - v]);
  const path = `M ${points.map((p) => p.join(" ")).join(" L ")}`;
  return (
    <svg viewBox="0 0 120 100" className="w-full h-40">
      <path d={path} stroke="#F97316" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="#FB923C" />)}
    </svg>
  );
}

/* Service form modal-ish */
function ServiceForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Astrology");
  const [price, setPrice] = useState("");

  const submit = () => {
    if (!title || !price) return alert("Title & price required");
    onAdd({ title, category, price: Number(price) });
    setTitle(""); setPrice(""); setCategory("Astrology"); setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg"><HiOutlinePlus /> Add Service</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="bg-white rounded-2xl p-6 relative z-10 w-full max-w-md shadow-lg">
            <h4 className="font-semibold mb-4">New Service</h4>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <select className="w-full px-3 py-2 border rounded mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Astrology</option><option>Numerology</option><option>Vastu</option>
            </select>
            <input placeholder="Price (INR)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={submit} className="px-4 py-2 rounded bg-orange-500 text-white">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Product form */
function ProductForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [file, setFile] = useState(null);

  const submit = () => {
    if (!name || !price) return alert("Name & price required");
    onAdd({ name, price: Number(price), stock: Number(stock), file });
    setName(""); setPrice(""); setStock(1); setFile(null); setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg"><HiOutlinePlus /> Add Product</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="bg-white rounded-2xl p-6 relative z-10 w-full max-w-md shadow-lg">
            <h4 className="font-semibold mb-4">New Product</h4>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <input placeholder="Price (INR)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="w-full mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={submit} className="px-4 py-2 rounded bg-orange-500 text-white">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Class form */
function ClassForm({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(10);

  const submit = () => {
    if (!title) return alert("Title required");
    onAdd({ title, seats: Number(seats), enrolled: 0 });
    setTitle(""); setSeats(10); setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg"><HiOutlinePlus /> Add Class</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="bg-white rounded-2xl p-6 relative z-10 w-full max-w-md shadow-lg">
            <h4 className="font-semibold mb-4">New Class</h4>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <input type="number" placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} className="w-full px-3 py-2 border rounded mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-2 rounded border">Cancel</button>
              <button onClick={submit} className="px-4 py-2 rounded bg-orange-500 text-white">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* content uploader */
function ContentUploader({ onUpload }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("video");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const submit = () => {
    if (!title || !file) return alert("Title & file required");
    onUpload(file, title, type, desc);
    setTitle(""); setType("video"); setFile(null); setDesc("");
  };

  return (
    <div className="border rounded p-4">
      <div className="grid md:grid-cols-3 gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 border rounded" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-2 border rounded">
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="article">Article</option>
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} className="px-3 py-2" />
      </div>
      <textarea placeholder="Short description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full mt-3 px-3 py-2 border rounded" />
      <div className="flex justify-end mt-3">
        <button onClick={submit} className="px-4 py-2 rounded bg-orange-500 text-white">Upload</button>
      </div>
    </div>
  );
}
