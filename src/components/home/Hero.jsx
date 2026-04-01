// components/home/Hero.jsx
import React from "react";
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
  // Floating icons data with different positions, sizes, and animation delays
  const floatingIcons = [
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, index) => {
          const IconComponent = item.Icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
              animate={{
                y: [0, -30, 0, 30, 0],
                x: [0, 20, 0, -20, 0],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
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

      {/* Additional Small Stars/Meteors */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Original decorative SVG - kept for compatibility */}
      <svg
        className="absolute -right-48 -top-32 opacity-20 pointer-events-none"
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
            transition={{ duration: 0.7 }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-3 bg-orange-100/60 text-red-700 px-3 py-1 rounded-full text-sm font-medium w-max shadow-sm backdrop-blur-sm">
              <RiStarSLine /> Featured
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Elevate your life with <Accent>astrology</Accent>, yoga &
              authentic ritual tools
            </h1>

            <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
              Personalized consultations, premium courses, and ethically sourced
              products — all designed to help you live with clarity, balance,
              and intention.
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 lg:mt-0"
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
    </section>
  );
};

export default Hero;