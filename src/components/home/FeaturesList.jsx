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

// Import your Dharma wheel image - update the path accordingly
import assets from "../../assets/assets";

const FeaturesList = () => {
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

  // Planet data for floating planets (only for the Dharma wheel card)
  const planets = [
    { name: "Mercury", size: 20, left: "5%", top: "10%", delay: 0, duration: 20, color: "#c4a35a" },
    { name: "Venus", size: 25, left: "85%", top: "15%", delay: 2, duration: 25, color: "#e8b4b4" },
    { name: "Earth", size: 28, left: "10%", top: "80%", delay: 4, duration: 22, color: "#4a90e2" },
    { name: "Mars", size: 22, left: "80%", top: "75%", delay: 1, duration: 18, color: "#e74c3c" },
    { name: "Jupiter", size: 35, left: "90%", top: "85%", delay: 3, duration: 30, color: "#d4a574" },
    { name: "Saturn", size: 30, left: "2%", top: "50%", delay: 5, duration: 28, color: "#e8c9a0" },
  ];

  // Reduce stars count on mobile
  const starCount = isLowEndDevice ? 30 : isMobile ? 60 : 100;

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Features (Light theme) */}
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

          {/* Right Side - Dharma Wheel Visualization with Space Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Space Background Container */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
              {/* Dark Space Background - Only for this card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900" />
              
              {/* Stars Background - Only for this card */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(starCount)].map((_, i) => (
                  <div
                    key={`star-${i}`}
                    className="absolute bg-white rounded-full animate-twinkle"
                    style={{
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                      opacity: Math.random() * 0.7 + 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Floating Planets - Only for this card */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {planets.map((planet, index) => (
                  <div
                    key={planet.name}
                    className="absolute rounded-full animate-float-planet"
                    style={{
                      width: `${planet.size}px`,
                      height: `${planet.size}px`,
                      left: planet.left,
                      top: planet.top,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 ${planet.size / 3}px ${planet.color}`,
                      animationDelay: `${planet.delay}s`,
                      animationDuration: `${planet.duration}s`,
                      opacity: isLowEndDevice ? 0.3 : 0.4,
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full blur-md"
                      style={{
                        backgroundColor: planet.color,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Nebula Effects - Only for this card */}
              {!isLowEndDevice && (
                <>
                  <div className="absolute top-10 left-5 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-10 right-5 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slower" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                </>
              )}

              {/* Card Content */}
              <div className="relative p-4 md:p-8 backdrop-blur-sm">
                {/* Glowing aura behind the wheel */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-red-500/20 blur-3xl animate-pulse" />
                </div>
                
                {/* Dharma Wheel Container */}
                <div className="relative w-full aspect-square max-w-sm md:max-w-md mx-auto">
                  {/* Outer decorative rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-spin-reverse-slow" />
                  <div className="absolute inset-8 rounded-full border border-red-500/20 animate-spin-slower" />
                  
                

                  {/* Dharma Wheel Image - Continuously Rotating */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: isLowEndDevice ? 30 : 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <img
                      src={assets.dharmawheel}
                      alt="Dharma Wheel"
                      className="w-60 h-60 md:w-96 md:h-96 object-contain drop-shadow-2xl"
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Inner decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-yellow-500/20 animate-pulse-slow" />
                    <div className="absolute w-12 h-12 md:w-20 md:h-20 rounded-full border border-red-500/20 animate-pulse-slower" />
                  </div>
                </div>

                {/* Floating energy orbs */}
                {!isLowEndDevice && (
                  <>
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-10 md:h-10 bg-purple-500/30 rounded-full blur-xl animate-float-orb" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 bg-red-500/30 rounded-full blur-xl animate-float-orb-delayed" />
                    <div className="absolute top-1/2 right-0 w-5 h-5 md:w-6 md:h-6 bg-blue-500/30 rounded-full blur-lg animate-float-orb-slow" />
                  </>
                )}

                {/* Complimentary Note */}
                <motion.div 
                  className="mt-6 md:mt-8 p-3 md:p-4 bg-white/5 backdrop-blur rounded-xl md:rounded-2xl border border-purple-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <strong className="text-yellow-400 text-xs md:text-sm">Complimentary:</strong>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300">
                    Short follow-up note with every consultation to help implement insights.
                    {!isMobile && " Plus, receive a personalized mantra based on your birth chart!"}
                  </p>
                </motion.div>

                {/* Energy rings SVG */}
                {!isLowEndDevice && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="100"
                      fill="none"
                      stroke="rgba(168,85,247,0.15)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      className="animate-spin-slow"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="80"
                      fill="none"
                      stroke="rgba(236,72,153,0.1)"
                      strokeWidth="1"
                      className="animate-spin-reverse-slow"
                    />
                  </svg>
                )}
              </div>
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
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float-planet {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(0, -15px);
          }
          75% {
            transform: translate(-10px, -5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }
        
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(8px, -8px);
          }
        }
        
        @keyframes orbit-particle {
          0% {
            transform: rotate(0deg) translateX(60px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(60px) rotate(-360deg);
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
        
        .animate-float-planet {
          animation: float-planet ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-pulse-slower {
          animation: pulse-slow 8s ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-float-orb {
          animation: float-orb 5s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-float-orb-delayed {
          animation: float-orb 6s ease-in-out infinite 1s;
          will-change: transform;
        }
        
        .animate-float-orb-slow {
          animation: float-orb 8s ease-in-out infinite 2s;
          will-change: transform;
        }
        
        .animate-orbit-particle {
          animation: orbit-particle 8s linear infinite;
          will-change: transform;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-orbit-particle {
            animation: orbit-particle 8s linear infinite;
          }
          
          @keyframes orbit-particle {
            0% {
              transform: rotate(0deg) translateX(40px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(40px) rotate(-360deg);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesList;