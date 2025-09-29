import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

// Helper component: Accent
const Accent = ({ children }) => (
  <span className="text-orange-600">{children}</span>
);

// Helper component: CTAButton
const CTAButton = ({ children, onClick, to }) => (
  <Link
    to={to}
    onClick={onClick}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform active:scale-95"
  >
    {children}
  </Link>
);

// Navbar component
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div>
                <img src={assets.logo} className="w-28" alt="Logo" />
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/services" className="text-gray-700 hover:text-orange-600 transition">Services</Link>
            <Link to="/classes" className="text-gray-700 hover:text-orange-600 transition">Classes</Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-600 transition">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <button className="p-2 rounded-md hover:bg-orange-50 transition">
                <HiOutlineShoppingCart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex gap-3">
              <CTAButton to="/auth">Sign Up</CTAButton>
              <CTAButton to="/contact">Book Now</CTAButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md border border-transparent hover:border-orange-100 transition"
                aria-label="menu"
              >
                {open ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-orange-50"
          >
            <div className="px-4 py-4 space-y-2">
              {[
                ["Services", "/services"],
                ["Classes", "/classes"],
                ["Products", "/products"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  className="block py-2 text-gray-700 hover:text-orange-600"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <CTAButton to="/auth" onClick={() => setOpen(false)}>Sign Up</CTAButton>
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
