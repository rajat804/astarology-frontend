// components/home/Stats.jsx
import React from "react";
import { motion } from "framer-motion";
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
  const clients = useCount(2580, 1600);
  const classes = useCount(120, 1400);
  const products = useCount(520, 1400);
  const rating = useCount(49, 1400);

  const stats = [
    {
      label: "Happy Clients",
      value: clients.toLocaleString(),
      suffix: "",
      subtitle: "and growing",
      icon: HiOutlineUsers,
      iconColor: "text-red-500",
      gradient: "from-red-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-red-100 to-orange-100",
      decorativeIcon: FaSmile,
    },
    {
      label: "Live Classes",
      value: classes,
      suffix: "+",
      subtitle: "recorded & live",
      icon: HiOutlineVideoCamera,
      iconColor: "text-purple-500",
      gradient: "from-purple-50 to-pink-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      decorativeIcon: GiYinYang,
    },
    {
      label: "Authentic Products",
      value: products,
      suffix: "+",
      subtitle: "certified & sourced",
      icon: HiOutlineShoppingBag,
      iconColor: "text-blue-500",
      gradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100",
      decorativeIcon: GiLotus,
    },
    {
      label: "Avg. Rating",
      value: (rating / 10).toFixed(1),
      suffix: " / 5",
      subtitle: "based on reviews",
      icon: HiOutlineStar,
      iconColor: "text-yellow-500",
      gradient: "from-yellow-50 to-amber-50",
      iconBg: "bg-gradient-to-br from-yellow-100 to-amber-100",
      decorativeIcon: FaStarHalfAlt,
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto min-h-[300px] opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="rgba(249, 115, 22, 0.1)"
            fillOpacity="1"
            d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,181.3C672,171,768,149,864,149.3C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,202.7C672,213,768,235,864,234.7C960,235,1056,213,1152,197.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        <svg
          className="absolute top-0 left-0 w-full h-auto min-h-[300px] opacity-20 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="rgba(168, 85, 247, 0.1)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            animate={{
              d: [
                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,128L48,138.7C96,149,192,171,288,170.7C384,171,480,149,576,138.7C672,128,768,128,864,138.7C960,149,1056,171,1152,170.7C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,117.3C960,128,1056,128,1152,112C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,144C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </svg>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const DecorativeIcon = stat.decorativeIcon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className={`relative bg-gradient-to-br ${stat.gradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/50 overflow-hidden group`}
              >
                {/* Animated Background Icon */}
                <motion.div
                  className="absolute -right-4 -bottom-4 opacity-10"
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <DecorativeIcon size={80} className="text-gray-700" />
                </motion.div>

                {/* Icon Container with Animation */}
                <motion.div
                  className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                </motion.div>

                {/* Stats Content */}
                <div className="relative z-10">
                  <div className="text-sm text-gray-500 font-medium tracking-wide">
                    {stat.label}
                  </div>
                  <div className="mt-2 font-bold text-3xl md:text-4xl text-gray-900 flex items-baseline gap-1">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-lg md:text-xl text-gray-600">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    {stat.subtitle}
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-200/50 transition-all duration-300 pointer-events-none"
                  initial={false}
                  whileHover={{ scale: 1 }}
                />
              </motion.div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default Stats;