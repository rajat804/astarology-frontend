// components/home/Stats.jsx
import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  HiOutlineUsers, 
  HiOutlineVideoCamera, 
  HiOutlineShoppingBag, 
  HiOutlineStar 
} from "react-icons/hi";
import { FaSmile, FaChalkboardTeacher, FaGem, FaStarHalfAlt } from "react-icons/fa";
import { GiCrystalBall, GiYinYang, GiLotus } from "react-icons/gi";
import useCount from "../../hooks/useCount";

const Stats = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  const clients = useCount(2580, 1600);
  const classes = useCount(120, 1400);
  const products = useCount(520, 1400);
  const rating = useCount(49, 1400);

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

  const stats = [
    {
      label: "Happy Clients",
      value: clients.toLocaleString(),
      suffix: "",
      subtitle: "and growing",
      icon: HiOutlineUsers,
      iconColor: "text-amber-400",
      gradient: "from-gray-800 to-gray-900",
      iconBg: "bg-gradient-to-br from-amber-500/20 to-amber-600/20",
      decorativeIcon: FaSmile,
      borderColor: "border-amber-500/30",
    },
    {
      label: "Live Classes",
      value: classes,
      suffix: "+",
      subtitle: "recorded & live",
      icon: HiOutlineVideoCamera,
      iconColor: "text-purple-400",
      gradient: "from-gray-800 to-gray-900",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      decorativeIcon: GiYinYang,
      borderColor: "border-purple-500/30",
    },
    {
      label: "Authentic Products",
      value: products,
      suffix: "+",
      subtitle: "certified & sourced",
      icon: HiOutlineShoppingBag,
      iconColor: "text-cyan-400",
      gradient: "from-gray-800 to-gray-900",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      decorativeIcon: GiLotus,
      borderColor: "border-cyan-500/30",
    },
    {
      label: "Avg. Rating",
      value: (rating / 10).toFixed(1),
      suffix: " / 5",
      subtitle: "based on reviews",
      icon: HiOutlineStar,
      iconColor: "text-yellow-400",
      gradient: "from-gray-800 to-gray-900",
      iconBg: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
      decorativeIcon: FaStarHalfAlt,
      borderColor: "border-yellow-500/30",
    },
  ];

  // Simplified wave animation - only on desktop and not low-end devices
  const showWaveAnimation = !isMobile && !isLowEndDevice;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gray-900">
      {/* Animated Wave Background - Simplified or removed on mobile/low-end */}
      {showWaveAnimation && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            className="absolute bottom-0 left-0 w-full h-auto min-h-[200px] opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="rgba(245, 158, 11, 0.15)"
              fillOpacity="1"
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              animate={{
                d: [
                  "M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,181.3C672,171,768,149,864,149.3C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            />
          </svg>
        </div>
      )}

      {/* Floating Orbs - Simplified on mobile */}
      {!isLowEndDevice && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-24 md:w-32 h-24 md:h-32 bg-amber-500/10 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-32 md:w-40 h-32 md:h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slower"></div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const DecorativeIcon = stat.decorativeIcon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isLowEndDevice ? 0 : index * 0.08,
                  ease: "easeOut"
                }}
                whileHover={!isMobile ? { 
                  y: -6,
                  transition: { duration: 0.2 }
                } : {}}
                className={`relative bg-gradient-to-br ${stat.gradient} rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border ${stat.borderColor} overflow-hidden group`}
              >
                {/* Background Icon - Removed animation on low-end */}
                {!isLowEndDevice && (
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <DecorativeIcon size={isMobile ? 60 : 80} className="text-white" />
                  </div>
                )}

                {/* Icon Container */}
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3 md:mb-4 shadow-md group-hover:shadow-lg transition-all backdrop-blur-sm border border-white/10`}>
                  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor}`} />
                </div>

                {/* Stats Content */}
                <div className="relative z-10">
                  <div className="text-xs md:text-sm text-gray-400 font-medium tracking-wide">
                    {stat.label}
                  </div>
                  <div className="mt-1 md:mt-2 font-bold text-2xl md:text-3xl lg:text-4xl text-white flex items-baseline gap-0.5 md:gap-1">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-base md:text-lg lg:text-xl text-gray-400">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 mt-1 md:mt-2 flex items-center gap-1">
                    <span className={`inline-block w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                      stat.label === "Happy Clients" ? "bg-amber-400" :
                      stat.label === "Live Classes" ? "bg-purple-400" :
                      stat.label === "Authentic Products" ? "bg-cyan-400" :
                      "bg-yellow-400"
                    } animate-pulse`}></span>
                    {stat.subtitle}
                  </div>
                </div>

                {/* Hover Border Effect - Disabled on mobile */}
                {!isMobile && (
                  <div className={`absolute inset-0 rounded-xl md:rounded-2xl border-2 border-transparent group-hover:${stat.borderColor} transition-all duration-300 pointer-events-none`} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -15px);
          }
        }
        
        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15px, 10px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Stats;