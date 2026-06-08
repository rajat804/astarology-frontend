// Footer.jsx
import React from "react";
import { GiCrystalBall } from "react-icons/gi";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaFacebook, FaYoutube, FaLinkedin, FaWhatsapp, FaNewspaper } from "react-icons/fa";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

// Helper component: Accent - Updated to green (for heading)
const Accent = ({ children }) => (
  <span className="text-green-600">{children}</span>
);

// Footer component - Updated with red and off-white theme
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-offWhite border-t border-orange-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex flex-col items-center">
                <img src={assets.logo} className="w-36" alt="Nakshatra Ganak Logo" />
                <div className="text-sm text-gray-500 mt-2">Align your stars. Find your calm.</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <HiMail className="text-red-500" /> info@nakshatraganak.com
              </div>
              <div className="flex items-center gap-2 mt-2">
                <HiPhone className="text-red-500" /> +91 99530 43676
              </div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3 text-gray-800">Explore</div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="/services" className="hover:text-red-600 transition">Services</Link></li>
              <li><Link to="/about" className="hover:text-red-600 transition">About</Link></li>
              <li><Link to="/blog" className="hover:text-red-600 transition">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3 text-gray-800">Connect With Us</div>
            <p className="text-sm text-gray-500 mb-4">Follow us on social media for daily astrological insights</p>
            <div className="flex gap-3 mb-6 flex-wrap">
              <a 
                href="https://www.facebook.com/share/17ka9SHW2n/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com/@nakshatraganak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/praveen-astro-tips-ii-nakshatra-ganak-praveen-astro-tips-ii-nakshatra-ganak-aa97311bb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/919953043676" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-500 hover:border-green-200 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a 
                href="https://profile.dailyhunt.in/ganak172885323655756" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 transition-all duration-300"
                aria-label="Daily Hunt"
              >
                <FaNewspaper className="w-4 h-4" />
              </a>
            </div>
            <div className="font-semibold mb-2 text-gray-800">Subscribe</div>
            <p className="text-sm text-gray-500">Get monthly horoscopes and updates.</p>
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
          <div>© {currentYear} Nakshatra Ganak • All rights reserved</div>
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