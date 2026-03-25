// Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";
import assets from "../assets/assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// CTA Button - Updated to red gradient
const CTAButton = ({ children, onClick, to }) => (
  <Link
    to={to}
    onClick={onClick}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform active:scale-95"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-offWhite/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={assets.logo} className="w-28" alt="Logo" />
          </Link>

          {/* Desktop nav - Updated hover color to red */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/services" className="text-gray-700 hover:text-red-600 transition">Services</Link>
            <Link to="/courses" className="text-gray-700 hover:text-red-600 transition">Courses</Link>
            <Link to="/products" className="text-gray-700 hover:text-red-600 transition">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-red-600 transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-red-600 transition">Contact</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:block p-2 rounded-md hover:bg-red-50 transition">
              <HiOutlineShoppingCart className="w-5 h-5 text-gray-600" />
            </button>

            {/* Auth buttons */}
            <div className="hidden sm:flex gap-3">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                >
                  Logout
                </button>
              ) : (
                <CTAButton to="/auth">Sign Up</CTAButton>
              )}
              <CTAButton to="/contact">Book Now</CTAButton>
            </div>

            {/* Mobile menu button - Updated hover color */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md hover:bg-red-50 transition"
              >
                {open ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - Updated colors */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-offWhite border-t border-orange-100"
          >
            <div className="px-4 py-4 space-y-2">
              {["Services","courses","Products","About","Contact"].map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-gray-700 hover:text-red-600 transition"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                  >
                    Logout
                  </button>
                ) : (
                  <CTAButton to="/auth" onClick={() => setOpen(false)}>Sign Up</CTAButton>
                )}
                <CTAButton to="/contact" onClick={() => setOpen(false)}>Book Now</CTAButton>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;