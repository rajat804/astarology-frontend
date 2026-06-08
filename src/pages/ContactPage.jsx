// frontend/src/pages/ContactPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineDeviceMobile,
  HiOutlineChatAlt,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineMail,
  HiOutlineX
} from "react-icons/hi";
import { GiCrystalBall, GiMagicSwirl } from "react-icons/gi";
import { 
  FaFacebook, FaYoutube, FaWhatsapp, FaLinkedin, FaPinterest, FaNewspaper 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import assets from "../assets/assets";  // ✅ Uncommented assets import

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const servicesList = [
    "Vedic Astrology",
    "Numerology",
    "Face Reading",
    "Vastu Shastra",
    "Paranormal Activity",
    "Spiritual Healer"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showMessage = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API_URL}/contact/send`, formData);
      
      if (response.data && response.data.success) {
        showMessage("✓ Message sent successfully! We will contact you soon.", "success");
        setFormData({ name: "", email: "", mobile: "", service: "", message: "" });
      } else {
        showMessage(response.data.message || "Failed to send message.", "error");
      }
    } catch (err) {
      showMessage("Network error. Please try again.", "error");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
            popupType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white min-w-[280px] max-w-md`}>
            {popupType === "success" ? <HiOutlineCheckCircle className="w-5 h-5" /> : <HiOutlineX className="w-5 h-5" />}
            <span className="flex-1 text-sm">{popupMessage}</span>
            <button onClick={() => setShowPopup(false)} className="text-white/80 hover:text-white">
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section with Image */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${assets.curosel5})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <HiOutlineMail className="text-yellow-400 w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-200">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Reach out for personalized astrological guidance and consultations
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about astrology, numerology, or vastu? Reach out to Praveen Nangia for guidance.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlinePhone className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-semibold">+91 99530 43676</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlineMail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold">info@nakshatraganak.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlineLocationMarker className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-semibold">Ghaziabad, Uttar Pradesh, India</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/919953043676" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition mb-6"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.facebook.com/share/17ka9SHW2n/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a href="https://pin.it/2VDKXPUBg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                    <FaPinterest className="w-4 h-4" />
                  </a>
                  <a href="https://youtube.com/@nakshatraganak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/praveen-astro-tips-ii-nakshatra-ganak-aa97311bb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition">
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a href="https://profile.dailyhunt.in/ganak172885323655756" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition">
                    <FaNewspaper className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select a service</option>
                    {servicesList.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-400 resize-none"
                    placeholder="Tell us about your query..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <HiOutlineArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes slide-down {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ContactPage;