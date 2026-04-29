// pages/ParanormalActivity.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineShieldCheck, 
  HiOutlineMoon, 
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineHome,
  HiOutlineUserGroup
} from "react-icons/hi";
import { 
  GiGhost, 
  GiMagicSwirl, 
  GiLotus,
  GiCrystalBall,
  GiVibratingShield,
  GiHealing,
  GiPrayer,
  GiCandleFlame
} from "react-icons/gi";
import { FaPrayingHands, FaFeatherAlt, FaOm } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTA from "../components/common/CTA";

const ParanormalActivity = () => {
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

  const signsOfDisturbance = [
    { sign: "Unexplained Anxiety", desc: "Feeling of being watched or constant fear", icon: GiGhost, color: "text-purple-500", bgColor: "bg-purple-50" },
    { sign: "Sleep Disturbances", desc: "Nightmares, insomnia, or restless sleep", icon: HiOutlineMoon, color: "text-blue-500", bgColor: "bg-blue-50" },
    { sign: "Sudden Setbacks", desc: "Unexpected failures or misfortunes", icon: GiCrystalBall, color: "text-red-500", bgColor: "bg-red-50" },
    { sign: "Negative Atmosphere", desc: "Constant arguments or heaviness in space", icon: HiOutlineHome, color: "text-orange-500", bgColor: "bg-orange-50" },
  ];

  const healingMethods = [
    { title: "Mantra Healing", desc: "Powerful Vedic chants for purification", icon: FaOm, color: "text-red-500", bgColor: "bg-red-50" },
    { title: "Spiritual Rituals", desc: "Traditional ceremonies for cleansing", icon: FaPrayingHands, color: "text-purple-500", bgColor: "bg-purple-50" },
    { title: "Energy Balancing", desc: "Harmonizing the aura of people and spaces", icon: GiVibratingShield, color: "text-blue-500", bgColor: "bg-blue-50" },
    { title: "Protection Guidance", desc: "Ongoing spiritual safety measures", icon: HiOutlineShieldCheck, color: "text-green-500", bgColor: "bg-green-50" },
  ];

  const rituals = [
    { name: "Vastu Dosh Nivaran", purpose: "Remove negative energies from property", duration: "3-5 Hours", color: "text-orange-500" },
    { name: "Grah Shanti Puja", purpose: "Planetary peace and protection", duration: "2-3 Hours", color: "text-purple-500" },
    { name: "Rahu-Ketu Shanti", purpose: "Break negative karmic patterns", duration: "2 Hours", color: "text-blue-500" },
    { name: "Maha Mrityunjaya", purpose: "Overcome fear and negativity", duration: "1-2 Hours", color: "text-green-500" },
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
                  background: `radial-gradient(circle, rgba(128,0,128,0.3) 0%, rgba(75,0,130,0.3) 100%)`,
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
                className="absolute w-0.5 h-0.5 bg-purple-200 rounded-full animate-twinkle"
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
              <GiGhost className="text-purple-300 w-4 h-4" />
              <span className="text-sm font-semibold text-purple-200">Spiritual Cleansing & Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Paranormal Activity
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Restore harmony and peace with ancient Vedic rituals and energy healing
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Request Energy Cleansing</CTA>
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
                  background: `radial-gradient(circle, rgba(128,0,128,0.2) 0%, rgba(75,0,130,0.2) 100%)`,
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
                  src="https://nakshatraganak.com/img/paranormal.jpg"
                  alt="Paranormal Activity Cleansing"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Protection Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                      <GiVibratingShield className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">Ancient Vedic Protection</p>
                      <p className="text-xs text-gray-500">Rituals rooted in 5000+ years of wisdom</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-purple-200/50 rounded-full blur-2xl animate-float-slow" />
                  <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-indigo-200/50 rounded-full blur-2xl animate-float-slower" />
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
                <span className="text-xs md:text-sm font-semibold text-red-600">Beyond the Visible World</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Healing Beyond the Visible World
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Energy never lies — when negative vibrations or unseen forces disturb the natural flow of peace, 
                it manifests as anxiety, sleep problems, or constant setbacks. Paranormal cleansing helps restore 
                harmony to affected people or spaces.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                At Nakshatraganak, we combine spiritual rituals, mantra healing, and energy balancing to neutralize 
                dark influences and restore calm. Our approach is grounded in ancient Vedic principles, ensuring 
                protection and divine guidance.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GiVibratingShield className="text-purple-500 w-5 h-5" />
                  <span>Space Cleansing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaPrayingHands className="text-red-500 w-5 h-5" />
                  <span>Spiritual Healing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineUserGroup className="text-blue-500 w-5 h-5" />
                  <span>Aura Protection</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <CTA>Request Energy Cleansing</CTA>
                <Link to="/contact" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                  Free Consultation <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signs of Disturbance Section */}
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
              <GiGhost className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Recognize the Signs</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Signs of Negative Energies
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Unexplained disturbances in your life or space may indicate spiritual imbalances
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {signsOfDisturbance.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.sign}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-md mb-1">{item.sign}</h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Healing Methods Section */}
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
              <GiHealing className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Our Approach</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Holistic Healing Methods
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Combining ancient Vedic rituals with spiritual guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {healingMethods.map((method, idx) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="text-center p-5 bg-white rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl ${method.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${method.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{method.title}</h4>
                  <p className="text-gray-500 text-sm">{method.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rituals Section */}
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
              <GiCandleFlame className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Vedic Rituals</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Powerful Cleansing Rituals
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Time-tested ceremonies to restore peace and positivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {rituals.map((ritual, idx) => (
              <motion.div
                key={ritual.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="mt-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ritual.color} bg-white shadow-sm`}>
                    <FaPrayingHands className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold ${ritual.color} text-lg`}>{ritual.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">{ritual.purpose}</p>
                  <p className="text-xs text-gray-400 mt-1">Duration: {ritual.duration}</p>
                </div>
              </motion.div>
            ))}
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
              <HiOutlineSparkles className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Simple Process</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              How Energy Cleansing Works
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Restore harmony in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Share Your Concern", desc: "Describe disturbances in life or space", icon: GiGhost },
              { step: "02", title: "Remote or On-Site Analysis", desc: "Energy assessment by our expert", icon: GiCrystalBall },
              { step: "03", title: "Receive Cleansing & Protection", desc: "Rituals performed with ongoing guidance", icon: GiVibratingShield },
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
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-purple-700 to-indigo-800">
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
            <GiVibratingShield className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Restore Peace and Harmony?
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Request an energy cleansing consultation today and experience the transformative power of ancient Vedic rituals
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Request Energy Cleansing</CTA>
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

export default ParanormalActivity;