import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import assets from "../assets/assets";

// ─── Sign In Button ──────────────────────────────────────
const SignInButton = () => (
  <Link
    to="/auth"
    className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-xs sm:text-sm md:text-base"
  >
    <HiOutlineUserCircle className="w-4 h-4 sm:w-5 sm:h-5" />
    <span>Sign In</span>
  </Link>
);

// ─── Navbar ──────────────────────────────────────────────
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const getUserDisplayName = () => {
    if (!user) {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.fullName) return parsed.fullName.split(" ")[0];
          if (parsed.email) return parsed.email.split("@")[0];
        } catch (err) {
          console.log(err);
        }
      }
      return "Guest";
    }
    if (user.fullName) return user.fullName.split(" ")[0];
    if (user.name) return user.name.split(" ")[0];
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How We Guide", path: "/how-we-guide" },
    { name: "Services", path: "/services" },
    { name: "Product", path: "/products" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  if (!isMounted) return null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            
            {/* ─── Logo ─── */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <img
                src={assets.logo}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-transform duration-200 group-hover:scale-105"
                alt="Nakshatra Ganak"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm sm:text-lg md:text-xl tracking-wide group-hover:text-amber-400 transition-colors">
                  Nakshatra Ganak
                </span>
                {/* Hide subtitle on mobile, show from sm breakpoint */}
                <span className="text-gray-400 text-[8px] sm:text-xs md:text-sm hidden sm:block">
                  Praveen Nangia
                </span>
              </div>
            </Link>

            {/* ─── Desktop Navigation ─── */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-amber-400 bg-gray-800/60 shadow-sm"
                        : "text-gray-300 hover:text-amber-400 hover:bg-gray-800/40"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* ─── Right Side ─── */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-1.5 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Open shopping cart"
              >
                <HiOutlineShoppingCart className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-900 text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Section */}
              <div className="relative user-menu" ref={userMenuRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm md:text-base"
                    >
                      <HiOutlineUserCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden xs:inline">{getUserDisplayName()}</span>
                      <HiOutlineChevronDown
                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/70 z-50 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-700">
                            <p className="font-semibold text-white truncate">
                              {user?.fullName || user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          </div>
                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700/50 text-gray-300 transition-colors"
                            >
                              <HiOutlineUser className="w-4 h-4" /> Profile
                            </Link>
                            <Link
                              to="/my-bookings"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700/50 text-gray-300 transition-colors"
                            >
                              <span className="text-base">📅</span> My Bookings
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-gray-700/50 text-red-400 transition-colors"
                            >
                              <HiOutlineLogout className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <SignInButton />
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 overflow-hidden shadow-inner"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "text-amber-400 bg-gray-800/60"
                        : "text-gray-300 hover:text-amber-400 hover:bg-gray-800/40"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-gray-800/40 transition-colors"
                >
                  Logout
                </button>
              )}
              {!isAuthenticated && (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold hover:shadow-lg transition-all"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Cart Drawer ─── */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  );
};

export default Navbar;