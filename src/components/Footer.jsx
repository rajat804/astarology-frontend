// Footer.jsx
import React from "react";
import { GiCrystalBall } from "react-icons/gi";
import { HiMail, HiPhone } from "react-icons/hi";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

// Helper component: Accent - Updated to green (for heading)
const Accent = ({ children }) => (
  <span className="text-green-600">{children}</span>
);

// Footer component - Updated with red and off-white theme
const Footer = () => {
  return (
    <footer className="bg-offWhite border-t border-orange-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-col items-center">
                <img src={assets.logo} className="w-36" alt="" />
                <div className="text-sm text-gray-500 mt-2">Align your stars. Find your calm.</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <HiMail className="text-red-500" /> contact@astroplanets.example
              </div>
              <div className="flex items-center gap-2 mt-2">
                <HiPhone className="text-red-500" /> +91 98765 43210
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3 text-gray-800">Explore</div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="/services" className="hover:text-red-600 transition">Services</Link></li>
              {/* <li><Link to="/courses" className="hover:text-red-600 transition">Courses</Link></li> */}
              {/* <li><Link to="/products" className="hover:text-red-600 transition">Products</Link></li> */}
              <li><Link to="/about" className="hover:text-red-600 transition">About</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3 text-gray-800">Subscribe</div>
            <p className="text-sm text-gray-500">Get monthly horoscopes, class discounts and product drops.</p>
            <div className="mt-3 flex gap-2">
              <input 
                className="w-full px-3 py-2 rounded-lg border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent" 
                placeholder="Your email" 
              />
              <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-orange-100 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} AstroPlanets • All rights reserved</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-red-600 transition cursor-pointer">Privacy</a>
            <a className="hover:text-red-600 transition cursor-pointer">Terms</a>
            <Link to="/admin/login" className="hover:text-red-600 transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;