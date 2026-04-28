// Footer.jsx
import React from "react";
import { GiCrystalBall } from "react-icons/gi";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

// Helper component: Accent - Updated to amber for dark theme
const Accent = ({ children }) => (
  <span className="text-amber-400">{children}</span>
);

// Footer component - Updated with dark theme
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-col items-start">
                <img src={assets.logo} className="w-36 brightness-0 invert" alt="Logo" />
                <div className="text-sm text-gray-400 mt-2">Align your stars. Find your calm.</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <HiMail className="text-amber-400 w-4 h-4" /> contact@astroplanets.example
              </div>
              <div className="flex items-center gap-2 mt-2">
                <HiPhone className="text-amber-400 w-4 h-4" /> +91 98765 43210
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <div className="font-semibold mb-3 text-gray-300">Follow Us</div>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-colors duration-300">
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <div className="font-semibold mb-3 text-gray-300">Explore</div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><Link to="/services" className="hover:text-amber-400 transition-colors duration-300">Services</Link></li>
              <li><Link to="/courses" className="hover:text-amber-400 transition-colors duration-300">Courses</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 transition-colors duration-300">Products</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors duration-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <div className="font-semibold mb-3 text-gray-300">Support</div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Return Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div>
            <div className="font-semibold mb-3 text-gray-300">Subscribe</div>
            <p className="text-sm text-gray-400">Get monthly horoscopes, class discounts and product drops.</p>
            <div className="mt-3 flex flex-col gap-2">
              <input 
                className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300" 
                placeholder="Your email address" 
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-gray-900 font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe anytime.</p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} AstroPlanets • All rights reserved</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">Privacy</a>
            <a className="hover:text-amber-400 transition-colors duration-300 cursor-pointer">Terms</a>
            <Link to="/admin/login" className="hover:text-amber-400 transition-colors duration-300">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;