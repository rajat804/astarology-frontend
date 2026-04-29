// components/home/OurJourney.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineArrowRight,
  HiOutlineCheckCircle
} from "react-icons/hi";
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiLotus,
  GiHealing,
  GiCompass
} from "react-icons/gi";
import { Link } from "react-router-dom";
import CTA from "../common/CTA";

const OurJourney = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

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

  const features = [
    { icon: GiCrystalBall, text: "Accurate birth chart analysis and personalized reports.", color: "text-purple-500", bgColor: "bg-purple-50" },
    { icon: GiHealing, text: "Remedies for peace, prosperity, and spiritual growth.", color: "text-green-500", bgColor: "bg-green-50" },
    { icon: GiCompass, text: "Guidance through Numerology, Vastu, and aura balancing.", color: "text-blue-500", bgColor: "bg-blue-50" },
  ];

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
      {/* Animated Background Elements */}
      {showBackgroundAnimations && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(orbCount)].map((_, i) => (
            <div
              key={`orb-${i}`}
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
          {[...Array(starCount)].map((_, i) => (
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
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
              <GiMagicSwirl className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-semibold text-red-600">Our Journey</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
              About Our Astrology Center
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              For centuries, the universe has guided human life through the movement of stars and planets. 
              At Poseify Astrology, we bring ancient Vedic wisdom into the modern world—helping people discover 
              clarity, purpose, and balance. Our experts specialize in Vedic Astrology, Numerology, Vastu, and 
              Spiritual Healing to illuminate your life's true path.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className={`mt-0.5 ${feature.bgColor} rounded-full p-1 group-hover:scale-110 transition-transform duration-300`}>
                      <HiOutlineCheckCircle className={`w-4 h-4 ${feature.color}`} />
                    </div>
                    <div className="text-gray-700 text-sm md:text-base">
                      {feature.text}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <CTA>Book Consultation</CTA>
              <Link to="/services" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                Explore Services <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://nakshatraganak.com/img/about.jpg"
                alt="Poseify Astrology Center"
                className="w-full h-auto object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating Quote Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                    <GiLotus className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900">Ancient Wisdom, Modern Guidance</p>
                    <p className="text-xs text-gray-500">Trusted by thousands for spiritual clarity</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            {!isMobile && (
              <>
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-200/50 rounded-full blur-2xl animate-float-slow" />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl animate-float-slower" />
              </>
            )}
          </motion.div>
        </div>
      </div>

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
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(30px) rotate(180deg);
          }
        }
        
        @keyframes float-slower {
          0%, 100% {
            transform: translateY(0) rotate(360deg);
          }
          50% {
            transform: translateY(-30px) rotate(0deg);
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
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default OurJourney;