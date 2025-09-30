import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX, HiOutlineShoppingCart } from "react-icons/hi";
import assets from "../assets/assets";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// CTA Button
const CTAButton = ({ children, onClick, to }) => (
  <Link
    to={to}
    onClick={onClick}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform active:scale-95"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={assets.logo} className="w-28" alt="Logo" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/services" className="text-gray-700 hover:text-orange-600">Services</Link>
            <Link to="/classes" className="text-gray-700 hover:text-orange-600">Classes</Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-600">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600">Contact</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:block p-2 rounded-md hover:bg-orange-50">
              <HiOutlineShoppingCart className="w-5 h-5 text-gray-600" />
            </button>

            {/* Auth buttons */}
            <div className="hidden sm:flex gap-3">
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                >
                  Logout
                </button>
              ) : (
                <CTAButton to="/auth">Sign Up</CTAButton>
              )}
              <CTAButton to="/contact">Book Now</CTAButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md hover:bg-orange-50"
              >
                {open ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-orange-50"
          >
            <div className="px-4 py-4 space-y-2">
              {["Services","Classes","Products","About","Contact"].map((label) => (
                <Link
                  key={label}
                  to={`/${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-gray-700 hover:text-orange-600"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="inline-flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
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
