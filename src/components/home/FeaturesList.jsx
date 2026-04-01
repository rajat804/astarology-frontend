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
  
  const items = [
    "Personalized charts & follow-up notes",
    "Flexible scheduling, instant reminders",
    "Certified experts with 10+ years experience",
    "Secure payments & easy refunds",
    "Global delivery of products with tracking",
  ];

  const planets = [
    { name: "Sun", icon: Sun, color: "text-yellow-500", size: 48, orbit: 0, glow: "rgba(255,200,0,0.3)" },
    { name: "Moon", icon: Moon, color: "text-gray-400", size: 42, orbit: 72, glow: "rgba(200,200,255,0.3)" },
    { name: "Star", icon: Sparkles, color: "text-blue-400", size: 36, orbit: 144, glow: "rgba(100,150,255,0.3)" },
    { name: "Flower", icon: Flower2, color: "text-pink-400", size: 44, orbit: 216, glow: "rgba(255,150,200,0.3)" },
    { name: "Orbit", icon: Orbit, color: "text-red-500", size: 40, orbit: 288, glow: "rgba(255,100,100,0.3)" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
      setActivePlanet(prev => (prev + 1) % planets.length);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-orange-50/30">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Premium Experience</span>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              What makes us premium
            </h3>
            <p className="text-gray-600 mt-3 text-lg">
              We blend time-tested systems with modern UX and high quality
              products — so your experience is seamless and meaningful.
            </p>

            <ul className="mt-8 space-y-5">
              {items.map((it, idx) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div 
                    className="mt-1 text-red-500 bg-red-50 p-1.5 rounded-lg group-hover:bg-red-100 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">{it}</div>
                    <div className="text-sm text-gray-500">
                      Carefully curated to ensure authenticity and clarity.
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Trust Badge */}
            <motion.div
              className="mt-8 flex items-center gap-4 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="text-sm text-gray-700">
                <strong className="text-green-600">4.9/5</strong> from 2,500+ clients
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Astrology Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50/80 to-purple-50/80 p-8 border border-orange-100 shadow-2xl backdrop-blur-sm">
              {/* Main Circle */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-orange-200"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-4 rounded-full border border-purple-200"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border border-red-200"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Center Lotus */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 3, repeat: Infinity },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <Flower2 className="w-20 h-20 text-purple-500 opacity-80" />
                </motion.div>

                {/* Orbiting Planets */}
                {planets.map((planet, index) => {
                  const IconComponent = planet.icon;
                  const angle = (rotation + planet.orbit) * (Math.PI / 180);
                  const radius = 140;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={planet.name}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        x: x,
                        y: y,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                      animate={{
                        scale: activePlanet === index ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        scale: { duration: 0.5, repeat: Infinity }
                      }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.3 }}
                      >
                        <IconComponent 
                          size={planet.size}
                          className={`${planet.color}`}
                          strokeWidth={1.5}
                        />
                        {/* Glow Effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-xl"
                          style={{
                            background: planet.glow,
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Floating Zodiac Signs */}
                {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((sign, idx) => {
                  const angle = (rotation * 2 + idx * 30) * (Math.PI / 180);
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={sign}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        x: x,
                        y: y,
                        translateX: "-50%",
                        translateY: "-50%",
                      }}
                    >
                      <motion.span
                        className="text-xs font-bold text-gray-400"
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          delay: idx * 0.25,
                          repeat: Infinity,
                        }}
                      >
                        {sign}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-purple-200 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />

              {/* Complimentary Note */}
              <motion.div 
                className="mt-8 p-4 bg-white/60 backdrop-blur rounded-2xl border border-orange-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-red-500" />
                  </motion.div>
                  <strong className="text-red-600">Complimentary:</strong>
                </div>
                <p className="text-sm text-gray-600">
                  Short follow-up note with every consultation to help implement insights.
                  Plus, receive a personalized mantra based on your birth chart!
                </p>
              </motion.div>

              {/* Animated Energy Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="120"
                  fill="none"
                  stroke="rgba(249,115,22,0.1)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="80"
                  fill="none"
                  stroke="rgba(168,85,247,0.1)"
                  strokeWidth="1.5"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;