// src/admin/AdminLogin.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    // Mock auth - replace with real API
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@astro.com" && password === "password") {
        localStorage.setItem("astro_admin", "true");
        nav("/admin/dashboard");
      } else {
        setErr("Invalid credentials. Try admin@astro.com / password");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left - branding */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 p-10 bg-gradient-to-br from-orange-200 to-orange-400 text-white">
          <div className="text-3xl font-extrabold">AstroPanel</div>
          <p className="text-sm max-w-xs text-white/90 text-center">
            Admin Portal — manage services, classes, bookings, products, and content.
          </p>
          <div className="w-48 h-48 bg-white/10 rounded-lg flex items-center justify-center">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="15" r="5" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="text-xs text-white/80 text-center">Secure admin access</div>
        </div>

        {/* Right - form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Admin sign in</h2>
          <p className="text-sm text-gray-500 mt-2">Enter your admin credentials to access the control panel.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="relative block">
              <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@astro.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </label>

            <label className="relative block">
              <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-300 outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold shadow"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <div className="text-xs text-gray-500 mt-2">Demo credentials — admin@astro.com / password</div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
