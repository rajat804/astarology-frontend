// components/home/FeaturesList.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Star, 
  Moon, 
  Sun,
  Sparkles,
  Circle,
  Flower2,
  Orbit
} from "lucide-react";

const FeaturesList = () => {
  const [activePlanet, setActivePlanet] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detect device performance
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Check for low-end devices
      const isSlow = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;
      const isLowEnd = mobile && isSlow;
      setIsLowEndDevice(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  const items = [
    "Personalized charts & follow-up notes",
    "Flexible scheduling, instant reminders",
    "Certified experts with 10+ years experience",
    "Secure payments & easy refunds",
    "Global delivery of products with tracking",
  ];

  // Reduce planets on mobile/low-end
  const planets = isLowEndDevice 
    ? [
        { name: "Sun", icon: Sun, color: "text-yellow-500", size: 36, orbit: 0, glow: "rgba(255,200,0,0.3)" },
        { name: "Moon", icon: Moon, color: "text-gray-400", size: 32, orbit: 120, glow: "rgba(200,200,255,0.3)" },
      ]
    : isMobile
    ? [
        { name: "Sun", icon: Sun, color: "text-yellow-500", size: 40, orbit: 0, glow: "rgba(255,200,0,0.3)" },
        { name: "Moon", icon: Moon, color: "text-gray-400", size: 36, orbit: 120, glow: "rgba(200,200,255,0.3)" },
        { name: "Sparkles", icon: Sparkles, color: "text-blue-400", size: 32, orbit: 240, glow: "rgba(100,150,255,0.3)" },
      ]
    : [
        { name: "Sun", icon: Sun, color: "text-yellow-500", size: 48, orbit: 0, glow: "rgba(255,200,0,0.3)" },
        { name: "Moon", icon: Moon, color: "text-gray-400", size: 42, orbit: 72, glow: "rgba(200,200,255,0.3)" },
        { name: "Star", icon: Sparkles, color: "text-blue-400", size: 36, orbit: 144, glow: "rgba(100,150,255,0.3)" },
        { name: "Flower", icon: Flower2, color: "text-pink-400", size: 44, orbit: 216, glow: "rgba(255,150,200,0.3)" },
        { name: "Orbit", icon: Orbit, color: "text-red-500", size: 40, orbit: 288, glow: "rgba(255,100,100,0.3)" },
      ];

  // Slower rotation on mobile for better performance
  useEffect(() => {
    const intervalTime = isLowEndDevice ? 100 : isMobile ? 80 : 50;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
      setActivePlanet(prev => (prev + 1) % planets.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [planets.length, isMobile, isLowEndDevice]);

  // Reduce background stars on mobile
  const starCount = isLowEndDevice ? 30 : isMobile ? 50 : 100;

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
      {/* Animated Background Stars - Using CSS animations on low-end */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(starCount)].map((_, i) => (
          isLowEndDevice ? (
            <div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-yellow-300 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ) : (
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
                repeatDelay: Math.random() * 2,
              }}
            />
          )
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
              <Sparkles className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-semibold text-red-600">Premium Experience</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              What makes us premium
            </h3>
            <p className="text-gray-600 mt-2 md:mt-3 text-base md:text-lg">
              We blend time-tested systems with modern UX and high quality
              products — so your experience is seamless and meaningful.
            </p>

            <ul className="mt-6 md:mt-8 space-y-3 md:space-y-5">
              {items.map((it, idx) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="flex items-start gap-2 md:gap-3 group"
                >
                  <div className="mt-1 text-red-500 bg-red-50 p-1 rounded-lg group-hover:bg-red-100 transition-colors">
                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm md:text-base">{it}</div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Carefully curated to ensure authenticity and clarity.
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Trust Badge */}
            <motion.div
              className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 bg-gradient-to-r from-orange-50 to-red-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-orange-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center gap-0.5 md:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="text-xs md:text-sm text-gray-700">
                <strong className="text-green-600">4.9/5</strong> from 2,500+ clients
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Astrology Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50/80 to-purple-50/80 p-4 md:p-8 border border-orange-100 shadow-xl backdrop-blur-sm">
              {/* Main Circle */}
              <div className="relative w-full aspect-square max-w-sm md:max-w-md mx-auto">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-200 animate-spin-slow" />
                
                {/* Middle Ring */}
                <div className="absolute inset-4 rounded-full border border-purple-200 animate-spin-reverse-slow" />
                
                {/* Inner Ring */}
                <div className="absolute inset-8 rounded-full border border-red-200 animate-spin-slower" />

                {/* Center Lotus - Simplified animation on mobile */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLowEndDevice ? (
                    <Flower2 className="w-12 h-12 md:w-20 md:h-20 text-purple-500 opacity-80" />
                  ) : (
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      <Flower2 className="w-12 h-12 md:w-20 md:h-20 text-purple-500 opacity-80" />
                    </motion.div>
                  )}
                </div>

                {/* Orbiting Planets */}
                {planets.map((planet, index) => {
                  const IconComponent = planet.icon;
                  const angle = (rotation + planet.orbit) * (Math.PI / 180);
                  const radius = isMobile ? 100 : 140;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={planet.name}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div className={`relative ${!isLowEndDevice ? 'hover:scale-110 transition-transform' : ''}`}>
                        <IconComponent 
                          size={planet.size}
                          className={`${planet.color}`}
                          strokeWidth={1.5}
                        />
                        {/* Glow Effect - Disabled on low-end */}
                        {!isLowEndDevice && (
                          <div
                            className="absolute inset-0 rounded-full blur-xl animate-pulse-glow"
                            style={{
                              background: planet.glow,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Floating Zodiac Signs - Reduced on mobile */}
                {!isLowEndDevice && (
                  ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((sign, idx) => {
                    const angle = (rotation * 2 + idx * 30) * (Math.PI / 180);
                    const radius = isMobile ? 75 : 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div
                        key={sign}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        }}
                      >
                        <span
                          className="text-[8px] md:text-xs font-bold text-gray-400 animate-pulse-opacity"
                          style={{
                            animationDelay: `${idx * 0.25}s`,
                          }}
                        >
                          {sign}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Decorative Elements - Hidden on mobile */}
              {!isMobile && (
                <>
                  <div className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-purple-200 rounded-full blur-2xl opacity-50 animate-pulse-scale" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-orange-200 rounded-full blur-2xl opacity-50 animate-pulse-scale-slow" />
                </>
              )}

              {/* Complimentary Note */}
              <motion.div 
                className="mt-6 md:mt-8 p-3 md:p-4 bg-white/60 backdrop-blur rounded-xl md:rounded-2xl border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                  <strong className="text-red-600 text-xs md:text-sm">Complimentary:</strong>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Short follow-up note with every consultation to help implement insights.
                  {!isMobile && " Plus, receive a personalized mantra based on your birth chart!"}
                </p>
              </motion.div>

              {/* Animated Energy Lines - Hidden on low-end */}
              {!isLowEndDevice && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r={isMobile ? "80" : "120"}
                    fill="none"
                    stroke="rgba(249,115,22,0.1)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animate-spin-slow"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r={isMobile ? "55" : "80"}
                    fill="none"
                    stroke="rgba(168,85,247,0.1)"
                    strokeWidth="1.5"
                    className="animate-spin-reverse-slow"
                  />
                </svg>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
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
        
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
        
        @keyframes pulse-opacity {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 40s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        .animate-pulse-opacity {
          animation: pulse-opacity 3s ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 4s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-pulse-scale-slow {
          animation: pulse-scale 5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default FeaturesList;