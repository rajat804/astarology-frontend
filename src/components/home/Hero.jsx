// components/home/Hero.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
import { RiStarSLine } from "react-icons/ri";
import { GiCrystalBall } from "react-icons/gi";
import {
  FaSun,
  FaMoon,
  FaStar,
  FaGlobe,
  FaRing,
  FaFeatherAlt,
} from "react-icons/fa";
import { GiEarthAmerica, GiAstronautHelmet, GiPlanetCore } from "react-icons/gi";
import Accent from "../common/Accent";
import CTA from "../common/CTA";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detect device performance
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low-end devices (older phones, tablets)
      const isSlow = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;
      const isLowEnd = mobile && isSlow;
      setIsLowEndDevice(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Reduce floating icons on mobile and low-end devices
  const floatingIcons = isLowEndDevice 
    ? [
        { Icon: FaSun, size: 28, top: "10%", left: "5%", color: "#f59e0b" },
        { Icon: GiCrystalBall, size: 32, bottom: "20%", left: "3%", color: "#a855f7" },
        { Icon: FaStar, size: 20, top: "70%", left: "15%", color: "#eab308" },
      ]
    : isMobile
    ? [
        { Icon: FaSun, size: 28, top: "10%", left: "5%", delay: 0, duration: 20, color: "#f59e0b" },
        { Icon: FaMoon, size: 24, top: "15%", right: "8%", delay: 2, duration: 22, color: "#94a3b8" },
        { Icon: GiCrystalBall, size: 32, bottom: "20%", left: "3%", delay: 1, duration: 18, color: "#a855f7" },
        { Icon: RiStarSLine, size: 20, top: "50%", right: "12%", delay: 3, duration: 24, color: "#f97316" },
        { Icon: FaStar, size: 18, top: "70%", left: "15%", delay: 1.5, duration: 16, color: "#eab308" },
        { Icon: FaRing, size: 22, top: "60%", right: "25%", delay: 0.8, duration: 20, color: "#f43f5e" },
      ]
    : [
        { Icon: FaSun, size: 32, top: "10%", left: "5%", delay: 0, duration: 20, color: "#f59e0b" },
        { Icon: FaMoon, size: 28, top: "15%", right: "8%", delay: 2, duration: 22, color: "#94a3b8" },
        { Icon: GiCrystalBall, size: 40, bottom: "20%", left: "3%", delay: 1, duration: 18, color: "#a855f7" },
        { Icon: RiStarSLine, size: 24, top: "50%", right: "12%", delay: 3, duration: 24, color: "#f97316" },
        { Icon: FaStar, size: 20, top: "70%", left: "15%", delay: 1.5, duration: 16, color: "#eab308" },
        { Icon: GiEarthAmerica, size: 36, bottom: "30%", right: "5%", delay: 2.5, duration: 21, color: "#3b82f6" },
        { Icon: FaGlobe, size: 30, top: "80%", right: "20%", delay: 0.5, duration: 19, color: "#06b6d4" },
        { Icon: GiAstronautHelmet, size: 35, top: "25%", left: "20%", delay: 1.8, duration: 23, color: "#8b5cf6" },
        { Icon: GiPlanetCore, size: 28, bottom: "40%", left: "25%", delay: 2.2, duration: 17, color: "#ec489a" },
        { Icon: FaRing, size: 26, top: "60%", right: "25%", delay: 0.8, duration: 20, color: "#f43f5e" },
        { Icon: FaFeatherAlt, size: 22, bottom: "15%", right: "15%", delay: 3.2, duration: 25, color: "#d946ef" },
        { Icon: RiStarSLine, size: 18, top: "35%", left: "35%", delay: 2.7, duration: 18, color: "#facc15" },
      ];

  // Reduce stars count on mobile
  const starCount = isLowEndDevice ? 10 : isMobile ? 20 : 30;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
      {/* Background Gradient Orbs - Static, no animation needed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons Container - Using CSS animations for better performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.Icon;
          // Use CSS animations on low-end devices for better performance
          if (isLowEndDevice) {
            return (
              <div
                key={index}
                className="absolute animate-float-simple"
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                  animation: `float-simple 15s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <IconComponent
                  size={item.size}
                  color={item.color}
                  className="opacity-20 transition-opacity duration-300"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
            );
          }
          
          // Use Framer Motion for desktop with reduced complexity
          return (
            <motion.div
              key={index}
              className="absolute will-change-transform"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
              animate={{
                y: [0, -20, 0, 20, 0],
                x: [0, 15, 0, -15, 0],
                rotate: [0, 8, 0, -8, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0,
              }}
            >
              <IconComponent
                size={item.size}
                color={item.color}
                className="opacity-20 hover:opacity-30 transition-opacity duration-300"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Stars/Meteors - Reduced count and using CSS animations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(starCount)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Original decorative SVG - kept for compatibility */}
      <svg
        className="absolute -right-48 -top-32 opacity-20 pointer-events-none hidden md:block"
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#fff7ed" />
            <stop offset="1" stopColor="#ffe7d7" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="260" fill="url(#g1)" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-5 sm:space-y-6 will-change-transform"
          >
            <div className="inline-flex items-center gap-3 bg-orange-100/60 text-red-700 px-3 py-1 rounded-full text-sm font-medium w-max shadow-sm backdrop-blur-sm">
              <RiStarSLine /> Featured
            </div>
            <h2 className="txt-2xl text-red-600">Welcome to Divine Guidance</h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Vedic <Accent>astrology</Accent>, & Numerology
            </h1>

            <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
              Unveil your destiny through ancient astrological wisdom. Understand the power of stars, numbers, and cosmic energy guiding your life path.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <CTA>Book a Consultation</CTA>
              <button className="px-4 sm:px-5 py-2 rounded-2xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition text-sm sm:text-base">
                Browse Products
              </button>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 items-center mt-4">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur-sm">
                <HiOutlineUser className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold">4.9/5</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Avg. rating</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur-sm">
                <GiCrystalBall className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold">2500+</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Clients served</div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2 sm:gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur-sm">
                <HiOutlineShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold">500+</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Products</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-6 lg:mt-0 will-change-transform"
          >
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-offWhite to-orange-50/80 p-6 sm:p-8 border border-orange-100 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <GiCrystalBall className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Natal Charts</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Deep insights</div>
                  </div>
                  <div className="bg-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <RiStarSLine className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Vedic Astrology</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Ancient wisdom</div>
                  </div>
                  <div className="bg-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <HiOutlineCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Workshops</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Live sessions</div>
                  </div>
                  <div className="bg-white/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <HiOutlineMail className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">Guidance</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Weekly insights</div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 text-center">
                  <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">✨ New Moon Special ✨</div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">First consultation: 20% off</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Use code: WELCOME20</div>
                  <button className="mt-3 sm:mt-4 px-4 sm:px-5 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-red-600 transition text-sm sm:text-base">
                    Claim Offer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS Animations for better performance */}
      <style jsx>{`
        @keyframes float-simple {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
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
        
        .animate-float-simple {
          animation: float-simple 15s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Hero;