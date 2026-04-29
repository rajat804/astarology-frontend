// pages/HowWeGuide.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineArrowRight, 
  HiOutlineCheckCircle,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart
} from "react-icons/hi";
import { 
  GiCrystalBall, 
  GiMagicSwirl, 
  GiVibratingShield,
  GiHealing,
  GiLotus,
  GiStarsStack
} from "react-icons/gi";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import CTA from "../components/common/CTA";

const HowWeGuide = () => {
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

  const guidingSteps = [
    { 
      step: "01", 
      title: "Identify Life Challenges", 
      description: "We begin by understanding your concerns, obstacles, and areas of life where you seek clarity and direction.",
      icon: HiOutlineLightBulb,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    { 
      step: "02", 
      title: "Provide Vedic Solutions", 
      description: "Our experts offer personalized remedies including mantras, gemstones, and rituals based on your birth chart and energy patterns.",
      icon: GiCrystalBall,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    { 
      step: "03", 
      title: "Balance Energy", 
      description: "Remove negative influences and restore harmony to your mind, body, and soul through energy healing and spiritual practices.",
      icon: GiHealing,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    { 
      step: "04", 
      title: "Offer Decision Clarity", 
      description: "Get clear guidance on career, relationships, health, and life decisions with confidence and peace of mind.",
      icon: GiStarsStack,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
  ];

  const features = [
    { icon: GiCrystalBall, text: "Identify life challenges and hidden obstacles", color: "text-purple-500" },
    { icon: GiMagicSwirl, text: "Provide personalized Vedic solutions and remedies", color: "text-blue-500" },
    { icon: GiVibratingShield, text: "Balance energy and remove negative influences", color: "text-green-500" },
    { icon: GiLotus, text: "Offer clarity in decision-making and life direction", color: "text-amber-500" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
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
              <GiLotus className="text-yellow-400 w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-200">Ancient Wisdom</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              How We Guide
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover our unique approach to spiritual guidance rooted in ancient Vedic wisdom
            </p>
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

      {/* Main Content Section */}
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
                  src={assets.guide}
                  alt="Spiritual Guidance"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <GiLotus className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">15+ Years of Experience</p>
                      <p className="text-xs text-gray-500">Trusted by thousands worldwide</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-200/50 rounded-full blur-2xl animate-float-slow" />
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
                <span className="text-xs md:text-sm font-semibold text-red-600">Our Approach</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Our Approach to Spiritual Guidance
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                At Nakshatraganak, we help individuals align with their spiritual path using ancient Vedic knowledge. 
                Our guidance focuses on identifying challenges, offering solutions, and restoring balance to mind, 
                body, and soul.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                We use a combination of astrology, numerology, face reading, and energy healing to give accurate 
                insights and actionable advice. Every guidance session is personalized and rooted in divine wisdom.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
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
                      <div className="mt-0.5">
                        <HiOutlineCheckCircle className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <div className="text-gray-700 text-sm md:text-base">
                        {feature.text}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <CTA>Book Your Guidance Session</CTA>
                <Link to="/contact" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                  Free Consultation <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
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
              <HiOutlineSparkles className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Our Process</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              How We Transform Lives
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              A step-by-step approach to guide you toward clarity and peace
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidingSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="relative text-center group"
                >
                  {/* Step Number Circle */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    {/* Connecting Line */}
                    {idx < guidingSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-red-300 to-orange-300" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto rounded-full ${step.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${step.color}`} />
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools We Use Section */}
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
              <GiStarsStack className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Tools We Use</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Ancient Sciences We Apply
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Combining multiple Vedic disciplines for comprehensive guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Vedic Astrology", icon: GiCrystalBall, color: "text-purple-500", bgColor: "bg-purple-50" },
              { name: "Numerology", icon: GiMagicSwirl, color: "text-blue-500", bgColor: "bg-blue-50" },
              { name: "Vastu Shastra", icon: GiVibratingShield, color: "text-green-500", bgColor: "bg-green-50" },
              { name: "Face Reading", icon: GiLotus, color: "text-pink-500", bgColor: "bg-pink-50" },
              { name: "Spiritual Healing", icon: GiHealing, color: "text-amber-500", bgColor: "bg-amber-50" },
              { name: "Paranormal Cleansing", icon: GiStarsStack, color: "text-indigo-500", bgColor: "bg-indigo-50" },
            ].map((tool, idx) => {
              const IconComponent = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="text-center p-4 bg-white rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 mx-auto rounded-full ${tool.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-gray-800">{tool.name}</p>
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
            <HiOutlineHeart className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Book a guidance session today and take the first step toward clarity, peace, and purpose
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Book Your Guidance Session</CTA>
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

export default HowWeGuide;