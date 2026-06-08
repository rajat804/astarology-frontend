import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineMenu, 
  HiOutlineX, 
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineChevronDown
} from "react-icons/hi";
import assets from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const CTAButton = ({ children, to }) => (
  <Link
    to={to}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition-all active:scale-95"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debug: Check user data
  useEffect(() => {
    if (isMounted) {
      console.log('🔍 Navbar - isAuthenticated:', isAuthenticated);
      console.log('🔍 Navbar - user object:', user);
      console.log('🔍 Navbar - localStorage user:', localStorage.getItem('user'));
    }
  }, [isAuthenticated, user, isMounted]);

  // User Name Display
  const getUserDisplayName = () => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.fullName) return parsedUser.fullName.split(' ')[0];
          if (parsedUser.email) return parsedUser.email.split('@')[0];
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
      return 'Guest';
    }
    if (user.fullName) return user.fullName.split(' ')[0];
    if (user.name) return user.name.split(' ')[0];
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    setUserMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How We Guide", path: "/how-we-guide" },
    { name: "Services", path: "/services" },
    { name: "Astrology", path: "/astrology" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={assets.logo} className="w-10 h-10 md:w-12 md:h-12 object-contain" alt="Logo" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg md:text-xl tracking-wide group-hover:text-amber-400 transition-colors">
                  Nakshatra Ganak
                </span>
                <span className="text-gray-400 text-xs md:text-sm">Praveen Nangia</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `transition ${isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-amber-400"}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button 
                onClick={() => setCartDrawerOpen(true)}
                className="p-2 rounded-md hover:bg-gray-800 relative transition-colors"
              >
                <HiOutlineShoppingCart className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Section */}
              {isAuthenticated ? (
                <div className="relative user-menu">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all"
                  >
                    <HiOutlineUserCircle className="w-5 h-5" />
                    <span className="hidden sm:block">{getUserDisplayName()}</span>
                    <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50"
                      >
                        <div className="p-4 border-b border-gray-700">
                          <p className="font-semibold text-white">{user?.fullName || user?.name || 'User'}</p>
                          <p className="text-xs text-gray-400 break-all">{user?.email}</p>
                        </div>
                        <div className="py-2">
                          <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700 text-gray-300 transition-colors">
                            <HiOutlineUser className="inline mr-2 w-4 h-4" /> My Profile
                          </Link>
                          <Link to="/my-bookings" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-700 text-gray-300 transition-colors">
                            📅 My Bookings
                          </Link>
                          <button 
                            onClick={handleLogout} 
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 transition-colors"
                          >
                            <HiOutlineLogout className="inline mr-2 w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <CTAButton to="/auth">Sign In</CTAButton>
              )}

              {/* Mobile Menu Button */}
              <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors">
                {open ? <HiOutlineX className="w-6 h-6 text-gray-300" /> : <HiOutlineMenu className="w-6 h-6 text-gray-300" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-b border-gray-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => 
                    `block py-2 transition ${isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-amber-400"}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {isAuthenticated && (
                <button onClick={handleLogout} className="w-full text-left py-2 text-red-400">
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
};

export default Navbar;