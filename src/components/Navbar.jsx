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
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiPalm, 
  GiVibratingShield,
  GiGhost,
  GiHealing
} from "react-icons/gi";
// import assets from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

// CTA Button - Updated to amber/gold gradient for dark theme
const CTAButton = ({ children, onClick, to }) => (
  <Link
    to={to}
    onClick={onClick}
    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transform transition-transform active:scale-95"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
      if (servicesDropdownOpen && !event.target.closest('.services-dropdown')) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen, servicesDropdownOpen]);

  const handleLogout = () => {
    logout();
    setOpen(false);
    setUserMenuOpen(false);
    navigate('/');
  };

  // Get user's display name (first name or full name)
  const getUserDisplayName = () => {
    if (!user) return 'User';
    return user.fullName?.split(' ')[0] || user.fullName || 'User';
  };

  // Services dropdown items
  const servicesItems = [
    { name: "Vedic Astrology", path: "/services/vedic-astrology", icon: GiCrystalBall, description: "Ancient wisdom for modern life" },
    { name: "Numerology", path: "/services/numerology", icon: GiMagicSwirl, description: "Discover your life path numbers" },
    { name: "Face Reading", path: "/services/face-reading", icon: GiPalm, description: "Facial features reveal personality" },
    { name: "Vastu", path: "/services/vastu", icon: GiVibratingShield, description: "Harmonize your living spaces" },
    { name: "Paranormal Activity", path: "/services/paranormal", icon: GiGhost, description: "Explore the supernatural" },
    { name: "Spiritual Healer", path: "/services/spiritual-healer", icon: GiHealing, description: "Heal mind, body, and soul" },
  ];

  // Navigation links configuration
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How We Guide", path: "/how-we-guide" },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Courses", path: "/courses" },
    // { name: "Products", path: "/products" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              {/* <img src={assets.logo} className="w-28 brightness-0 invert" alt="Logo" /> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => 
                link.hasDropdown ? (
                  <div key={link.name} className="relative services-dropdown">
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className={`flex items-center gap-1 transition ${
                        servicesDropdownOpen
                          ? "text-amber-400"
                          : "text-gray-300 hover:text-amber-400"
                      }`}
                    >
                      {link.name}
                      <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Services Dropdown Menu */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-72 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {servicesItems.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-700 transition-colors duration-200 group"
                                >
                                  <div className="mt-0.5">
                                    <IconComponent className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5">
                                      {item.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `transition ${
                        isActive
                          ? "text-amber-400 font-semibold border-b-2 border-amber-400"
                          : "text-gray-300 hover:text-amber-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Cart Button with count */}
              <button 
                onClick={() => setCartDrawerOpen(true)}
                className="hidden sm:block p-2 rounded-md hover:bg-gray-800 transition relative"
              >
                <HiOutlineShoppingCart className="w-5 h-5 text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-gray-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth buttons */}
              <div className="hidden sm:flex gap-3 items-center">
                {isAuthenticated ? (
                  <div className="relative user-menu">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition group"
                    >
                      <HiOutlineUserCircle className="w-5 h-5" />
                      <span>{getUserDisplayName()}</span>
                      <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* User Dropdown Menu */}
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-50"
                        >
                          <div className="px-4 py-3 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
                            <p className="text-sm font-semibold text-white">{user?.fullName}</p>
                            <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                          </div>
                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-amber-400 transition"
                            >
                              <HiOutlineUser className="w-4 h-4" />
                              My Profile
                            </Link>
                            <Link
                              to="/my-bookings"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-amber-400 transition"
                            >
                              <HiOutlineShoppingCart className="w-4 h-4" />
                              My Bookings
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-amber-400 hover:bg-gray-700 transition border-t border-gray-700 mt-1"
                            >
                              <HiOutlineLogout className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <CTAButton to="/auth">Sign In</CTAButton>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 rounded-md hover:bg-gray-800 transition"
                >
                  {open ? <HiOutlineX className="w-6 h-6 text-gray-300" /> : <HiOutlineMenu className="w-6 h-6 text-gray-300" />}
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
              className="md:hidden bg-gray-900 border-t border-gray-700"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile nav links */}
                {navLinks.map((link) => 
                  link.hasDropdown ? (
                    <div key={link.name} className="space-y-2">
                      <div className="text-gray-300 font-semibold py-2">{link.name}</div>
                      <div className="pl-4 space-y-2 border-l-2 border-amber-500/30">
                        {servicesItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <NavLink
                              key={item.name}
                              to={item.path}
                              onClick={() => setOpen(false)}
                              className={({ isActive }) =>
                                `flex items-center gap-2 py-2 transition ${
                                  isActive ? "text-amber-400" : "text-gray-400 hover:text-amber-400"
                                }`
                              }
                            >
                              <IconComponent className="w-4 h-4" />
                              <span className="text-sm">{item.name}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block py-2 transition ${
                          isActive ? "text-amber-400 font-semibold" : "text-gray-300 hover:text-amber-400"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                )}
                
                {/* Cart in mobile menu */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setCartDrawerOpen(true);
                  }}
                  className="w-full flex items-center justify-between py-2 text-gray-300 hover:text-amber-400 transition"
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-amber-500 text-gray-900 text-xs px-2 py-1 rounded-full">
                      {cartCount} items
                    </span>
                  )}
                </button>
                
                {/* User Info in Mobile Menu */}
                {isAuthenticated && user && (
                  <div className="pt-4 pb-2 border-t border-gray-700 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <HiOutlineUserCircle className="w-6 h-6 text-gray-900" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{user.fullName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block py-2 text-gray-300 hover:text-amber-400 transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setOpen(false)}
                      className="block py-2 text-gray-300 hover:text-amber-400 transition"
                    >
                      My Bookings
                    </Link>
                  </div>
                )}
                
                <div className="pt-2 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow-md transition"
                    >
                      <HiOutlineLogout className="w-4 h-4" />
                      Logout
                    </button>
                  ) : (
                    <CTAButton to="/auth" onClick={() => setOpen(false)}>Sign In</CTAButton>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </>
  );
};

export default Navbar;