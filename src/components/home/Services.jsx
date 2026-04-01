// components/home/Services.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineUserGroup
} from "react-icons/hi";
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiVibratingShield,
  GiStarsStack,
  GiLotus
} from "react-icons/gi";
import { FaStar, FaInfinity, FaMoon, FaSun } from "react-icons/fa";
import CTA from "../common/CTA";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const services = [
    {
      title: "One-on-one Natal Chart Reading",
      desc: "Deep, personalized chart analysis, career & relationship guidance.",
      duration: "60 min",
      price: "₹2,499",
      img: "https://media.istockphoto.com/id/1935644904/photo/zodiac-wheel-natal-chart-astrology-dices-and-stones-on-grey-table-flat-lay.jpg?s=612x612&w=0&k=20&c=128i99Orc9Y_RU3nSYKNLjf-INw5inM6q_H9FDCi_JE=",
      icon: GiCrystalBall,
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      benefits: ["Birth Chart Analysis", "Career Guidance", "Relationship Insights"],
      symbols: ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"],
      symbolType: "zodiac"
    },
    {
      title: "Numerology Life Path Report",
      desc: "Actionable insights from your core numbers and cycles.",
      duration: "45 min",
      price: "₹1,299",
      img: "https://astrala.imgix.net/3GFULF5okVu23twscOo7Fd/7406ee47eac22e71767ea4f4ec1412c7/life-path-number-7-meaning.jpg?w=3840&h=2560&fit=crop&q=60&auto=format,compress",
      icon: GiStarsStack,
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
      benefits: ["Life Path Number", "Destiny Matrix", "Cycle Analysis"],
      symbols: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      symbolType: "numbers"
    },
    {
      title: "Vastu Home Harmony Session",
      desc: "Practical remedies to balance your living & working space.",
      duration: "90 min",
      price: "₹3,999",
      img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      icon: GiVibratingShield,
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
      benefits: ["Space Analysis", "Energy Balancing", "Remedial Solutions"],
      symbols: ["N", "S", "E", "W", "NE", "NW", "SE", "SW"],
      symbolType: "directions"
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(249,115,22,0.3) 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
        >
          <div className="mb-4 md:mb-0">
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <GiMagicSwirl className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Divine Guidance</span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Premium Consultation Services
            </h3>
            <p className="text-gray-600 mt-2">
              Book curated sessions crafted by senior practitioners
            </p>
          </div>
          <motion.div 
            className="hidden md:flex gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300">
              View all
            </button>
            <CTA>Book a Slot</CTA>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const IconComponent = s.icon;
            const isHovered = hoveredCard === i;
            
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -12 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"
                  animate={{ opacity: isHovered ? 0.3 : 0 }}
                />
                
                <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100 backdrop-blur-sm ${s.gradient}`}>
                  {/* Image Section with Parallax Effect */}
                  <div className="relative h-52 overflow-hidden">
                    <motion.img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badge with Animation */}
                    <motion.div
                      className="absolute left-4 top-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg"
                      whileHover={{ scale: 1.05, x: 5 }}
                      animate={{ rotate: [0, -2, 0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨ Expert Session
                    </motion.div>

                    {/* Floating Icon */}
                    <motion.div
                      className="absolute right-4 bottom-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconComponent className={`w-5 h-5 ${s.iconColor}`} />
                    </motion.div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <motion.h4 
                      className="text-xl font-semibold text-gray-900"
                      animate={{ color: isHovered ? "#dc2626" : "#111827" }}
                    >
                      {s.title}
                    </motion.h4>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {s.desc}
                    </p>

                    {/* Benefits List */}
                    <motion.div 
                      className="space-y-1.5"
                      initial={false}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                      {s.benefits.map((benefit, idx) => (
                        <motion.div
                          key={benefit}
                          className="flex items-center gap-2 text-xs text-gray-500"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <HiOutlineSparkles className="w-3 h-3 text-red-500" />
                          <span>{benefit}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Divider with Animation */}
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"
                      animate={{ scaleX: isHovered ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Duration & Price Section */}
                    <div className="flex items-center justify-between">
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-gray-500"
                        whileHover={{ scale: 1.05 }}
                      >
                        <HiOutlineClock className="w-4 h-4 text-red-500" />
                        <span>{s.duration}</span>
                      </motion.div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">Starting from</div>
                        <motion.div 
                          className="text-2xl font-bold text-gray-900"
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                        >
                          {s.price}
                          <span className="text-sm font-normal text-gray-500">/session</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <motion.button 
                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CTA className="flex-none">Book Now</CTA>
                      </motion.div>
                    </div>

                    {/* Symbols Animation */}
                    <AnimatePresence>
                      {isHovered && s.symbols && s.symbols.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-3 pt-3 border-t border-orange-100"
                        >
                          <div className="flex items-center justify-center gap-1 flex-wrap">
                            {s.symbols.map((symbol, idx) => (
                              <motion.span
                                key={`${s.symbolType}-${idx}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: idx * 0.03 }}
                                className={`text-xs ${
                                  s.symbolType === 'zodiac' 
                                    ? 'text-purple-400 hover:text-purple-600' 
                                    : s.symbolType === 'numbers'
                                    ? 'text-blue-400 hover:text-blue-600 font-mono'
                                    : 'text-green-400 hover:text-green-600'
                                } transition-colors cursor-help`}
                                title={
                                  s.symbolType === 'zodiac' 
                                    ? 'Zodiac Sign' 
                                    : s.symbolType === 'numbers'
                                    ? 'Numerology Number'
                                    : 'Direction'
                                }
                              >
                                {symbol}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Decorative Floating Elements */}
        <motion.div
          className="absolute -left-20 top-1/3 opacity-10 hidden xl:block"
          animate={{
            y: [0, 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <GiLotus size={150} className="text-purple-600" />
        </motion.div>

        <motion.div
          className="absolute -right-20 bottom-1/3 opacity-10 hidden xl:block"
          animate={{
            y: [0, -30, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaMoon size={120} className="text-orange-600" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <FaInfinity size={80} className="text-red-500" />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;