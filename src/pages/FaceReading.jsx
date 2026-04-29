// pages/FaceReading.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineEye,
  HiOutlineEmojiHappy,
  HiOutlineHeart
} from "react-icons/hi";
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiLotus,
  GiStarsStack,
  GiYinYang,
  GiAstronautHelmet,
  GiHeartWings,
  GiDiamondRing,
  GiCrown,
   
} from "react-icons/gi";
import { FaInfinity, FaMoon, FaStar, FaQuoteLeft, FaChartLine, FaSmile,FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTA from "../components/common/CTA";

const FaceReading = () => {
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

  const facialFeatures = [
    { feature: "Forehead", meaning: "Wisdom, intellect, and decision-making abilities", icon: HiOutlineEye, color: "text-purple-500", bgColor: "bg-purple-50" },
    { feature: "Eyes", meaning: "Emotions, sincerity, and inner vision", icon: HiOutlineEye, color: "text-blue-500", bgColor: "bg-blue-50" },
    { feature: "Nose", meaning: "Wealth, status, and life path", icon: HiOutlineEmojiHappy, color: "text-amber-500", bgColor: "bg-amber-50" },
    { feature: "Lips", meaning: "Communication, relationships, and desires", icon: HiOutlineHeart, color: "text-pink-500", bgColor: "bg-pink-50" },
    { feature: "Chin", meaning: "Willpower, determination, and stability", icon: GiCrown, color: "text-green-500", bgColor: "bg-green-50" },
    { feature: "Cheeks", meaning: "Vitality, generosity, and social nature", icon: FaSmile, color: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  const benefits = [
    { icon: GiHeartWings, title: "Emotional Balance", desc: "Understand your emotional patterns and reactions", color: "text-pink-500", bgColor: "bg-pink-50" },
    { icon: GiCrown, title: "Career Direction", desc: "Discover professional paths aligned with your nature", color: "text-purple-500", bgColor: "bg-purple-50" },
    { icon: GiDiamondRing, title: "Relationship Harmony", desc: "Find compatibility and understand partners better", color: "text-red-500", bgColor: "bg-red-50" },
    { icon: GiStarsStack, title: "Life Purpose", desc: "Uncover your true potential and destiny", color: "text-blue-500", bgColor: "bg-blue-50" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
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
              <FaUser  className="text-yellow-400 w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-200">Samudrika Shastra</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Face Reading
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover the ancient art of reading faces to understand your true nature and destiny
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Get Your Face Analysis</CTA>
              <Link to="/services" className="px-6 py-2.5 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Explore Other Services
              </Link>
            </div>
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

      {/* Main Content Section - Left Image, Right Content */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`main-orb-${i}`}
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
                key={`main-star-${i}`}
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
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://nakshatraganak.com/img/service-4.jpg"
                  alt="Face Reading - Samudrika Shastra"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Feature Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                      <FaUser  className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">Ancient Wisdom</p>
                      <p className="text-xs text-gray-500">Samudrika Shastra - The Science of Face Reading</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-pink-200/50 rounded-full blur-2xl animate-float-slow" />
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl animate-float-slower" />
                </>
              )}
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
                <GiMagicSwirl className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-semibold text-red-600">The Mirror of Soul</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Decode the Emotions Written on Your Face
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Your face is a reflection of your inner energy. Ancient seers believed that the shape of the eyes, 
                lips, forehead, and smile reveal your nature and destiny. Face Reading (Samudrika Shastra) interprets 
                these features to help you understand your true potential.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                At Nakshatraganak, we use traditional methods to assess emotional balance, career direction, and 
                relationship harmony — simply by reading your expressions and aura. This wisdom helps you live more 
                consciously and confidently.
              </p>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, idx) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 group"
                    >
                      <div className={`mt-1 ${benefit.color} ${benefit.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm md:text-base">
                          {benefit.title}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {benefit.desc}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <CTA>Get Your Face Analysis</CTA>
                <Link to="/contact" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                  Free Consultation <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facial Features Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4">
              <FaUser  className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">What Your Face Reveals</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Facial Features & Their Meanings
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Every feature on your face tells a story about your personality and destiny
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {facialFeatures.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h4 className={`font-bold text-lg ${item.color}`}>{item.feature}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.meaning}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4">
              <HiOutlineChartBar className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Simple Process</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              How Face Reading Consultation Works
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Get insights about your personality and destiny in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Share Your Photos", desc: "Upload clear photos of your face (front and side view)", icon: FaUser  },
              { step: "02", title: "Expert Analysis", desc: "Our expert analyzes your facial features and expressions", icon: GiCrystalBall },
              { step: "03", title: "Receive Insights", desc: "Get detailed report about your nature and destiny", icon: HiOutlineSparkles },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-md border border-orange-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <IconComponent className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-red-600 to-orange-600">
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
            <FaUser  className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Discover What Your Face Reveals?
            </h2>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Book a face reading consultation today and unlock the secrets written on your face
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Get Your Face Analysis</CTA>
              <Link to="/contact" className="px-6 py-2.5 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Free Consultation
              </Link>
            </div>
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
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
          will-change: transform, opacity;
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
    </>
  );
};

export default FaceReading;