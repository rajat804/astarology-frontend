// pages/Contact.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineDeviceMobile,
  HiOutlineChatAlt,
  HiOutlineArrowRight,
  HiOutlineCheckCircle
} from "react-icons/hi";
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiLotus,
  GiStarsStack,
  GiYinYang,
  GiHealing,
  GiCompass
} from "react-icons/gi";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTA from "../components/common/CTA";

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Detect device performance
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      const isSlow = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;
      const isLowEnd = mobile && isSlow;
      setIsLowEndDevice(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const showBackgroundAnimations = !isLowEndDevice;
  const orbCount = isLowEndDevice ? 2 : isMobile ? 3 : 6;
  const starCount = isLowEndDevice ? 15 : isMobile ? 25 : 50;

  const servicesList = [
    "Vedic Astrology",
    "Numerology",
    "Face Reading",
    "Vastu Shastra",
    "Paranormal Activity",
    "Spiritual Healer"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        service: "",
        message: ""
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://nakshatraganak.com/img/curosel5.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`hero-orb-${i}`}
                className="absolute rounded-full blur-3xl opacity-20 animate-float-orb"
                style={{
                  width: `${100 + Math.random() * 150}px`,
                  height: `${100 + Math.random() * 150}px`,
                  background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(249,115,22,0.3) 100%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${15 + i * 3}s`,
                }}
              />
            ))}
            {[...Array(starCount)].map((_, i) => (
              <div
                key={`hero-star-${i}`}
                className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
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
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`contact-orb-${i}`}
                className="absolute rounded-full blur-3xl opacity-20 animate-float-orb"
                style={{
                  width: `${100 + Math.random() * 150}px`,
                  height: `${100 + Math.random() * 150}px`,
                  background: `radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(249,115,22,0.2) 100%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${15 + i * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
                <GiMagicSwirl className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-semibold text-red-600">Get in Touch</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Contact Us
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                We're Here to Help. Have questions about astrology, numerology, or vastu? 
                Reach out to Praveen Nangia for personalized guidance and consultations.
              </p>

              {/* Contact Details */}
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlinePhone className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="font-semibold text-gray-900">+91 9953043676</div>
                    <div className="text-xs text-gray-400">Mon-Sat, 10 AM - 7 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlineMail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900">info@nakshatraganak.com</div>
                    <div className="text-xs text-gray-400">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3 bg-white rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <HiOutlineLocationMarker className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="font-semibold text-gray-900">Delhi, India</div>
                    <div className="text-xs text-gray-400">Online consultations available worldwide</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/919953043676" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 mb-6"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              {/* Social Links */}
              <div>
                <div className="font-semibold text-gray-900 mb-3">Follow Us</div>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300">
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-300">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-orange-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Send us a Message</h3>
                <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll get back to you soon.</p>

                {submitSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 text-sm">Message sent successfully! We'll contact you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white text-gray-900"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white text-gray-900"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                    <div className="relative">
                      <HiOutlineDeviceMobile className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white text-gray-900"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Service</label>
                    <div className="relative">
                      <GiCrystalBall className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white text-gray-900 appearance-none cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {servicesList.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <div className="relative">
                      <HiOutlineChatAlt className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white text-gray-900 resize-none"
                        placeholder="Tell us about your query or concern..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                    ) : (
                      <>Send Message <HiOutlineArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="relative py-12 overflow-hidden bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4">
              <HiOutlineLocationMarker className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Find Us</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Our Location
            </h3>
          </motion.div>
          
          <div className="rounded-2xl overflow-hidden shadow-lg border border-orange-100 h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319276!2d77.068897!3d28.527554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x372e4f5bfe6b6a6!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NakshatraGanak Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-r from-red-600 to-orange-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`cta-star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GiCrystalBall className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your Cosmic Journey?
            </h2>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Book a consultation today and discover what the stars have planned for you
            </p>
            <CTA>Book Consultation</CTA>
          </motion.div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -15px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 10px) scale(0.95);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }
        
        .animate-float-orb {
          animation: float-orb ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default ContactPage;