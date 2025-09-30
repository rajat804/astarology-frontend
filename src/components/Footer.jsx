import React from "react";
import { GiCrystalBall } from "react-icons/gi";
import { HiMail, HiPhone } from "react-icons/hi";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

// Helper component: Accent
const Accent = ({ children }) => (
  <span className="text-orange-600">{children}</span>
);

// Footer component
const Footer = () => {
  return (
    <footer className="bg-white border-t border-orange-50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              
              <div className="flex flex-col items-center">
                <img src={assets.logo} className="w-36" alt="" />
                <div className="text-sm text-gray-500">Align your stars. Find your calm.</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><HiMail /> contact@astroplanets.example</div>
              <div className="flex items-center gap-2 mt-2"><HiPhone /> +91 98765 43210</div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3">Explore</div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link to="/services" className="hover:text-orange-600">Services</Link></li>
              <li><Link to="/courses" className="hover:text-orange-600">Courses</Link></li>
              <li><Link to="/products" className="hover:text-orange-600">Products</Link></li>
              <li><Link to="/about" className="hover:text-orange-600">About</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Subscribe</div>
            <p className="text-sm text-gray-500">Get monthly horoscopes, class discounts and product drops.</p>
            <div className="mt-3 flex gap-2">
              <input className="w-full px-3 py-2 rounded-lg border border-orange-100" placeholder="Your email" />
              <button className="px-4 py-2 rounded-lg bg-orange-400 text-white">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-orange-50 pt-6 text-sm text-gray-500 flex items-center justify-between">
          <div>© {new Date().getFullYear()} AstroPlanets • All rights reserved</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-orange-600">Privacy</a>
            <a className="hover:text-orange-600">Terms</a>
            <Link to="/admin/login" className="hover:text-orange-600">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;