// pages/SpiritualHealer.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineHeart, 
  HiOutlineSparkles, 
  HiOutlineArrowRight,
  HiOutlineUserGroup,
  HiOutlineSun
} from "react-icons/hi";
import { 
  GiHealing, 
  GiMagicSwirl, 
  GiLotus,
  GiCrystalBall,
  GiVibratingShield,
  GiPrayer,
  GiMeditation,
  GiSolarPower
} from "react-icons/gi";
import { FaHandsHelping, FaFeatherAlt, FaOm, FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTA from "../components/common/CTA";

const SpiritualHealer = () => {
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

  const healingBenefits = [
    { title: "Stress Relief", desc: "Release emotional and mental blocks", icon: GiSolarPower, color: "text-orange-500", bgColor: "bg-orange-50" },
    { title: "Emotional Balance", desc: "Restore inner peace and calm", icon: HiOutlineHeart, color: "text-pink-500", bgColor: "bg-pink-50" },
    { title: "Spiritual Awakening", desc: "Connect with your higher self", icon: GiLotus, color: "text-purple-500", bgColor: "bg-purple-50" },
    { title: "Energy Cleansing", desc: "Remove negative vibrations", icon: GiVibratingShield, color: "text-blue-500", bgColor: "bg-blue-50" },
  ];

  const healingMethods = [
    { name: "Mantra Healing", description: "Sacred sound vibrations for energy alignment", icon: FaOm, color: "text-red-500" },
    { name: "Chakra Balancing", description: "Clearing and activating energy centers", icon: GiCrystalBall, color: "text-purple-500" },
    { name: "Meditation Guidance", description: "Connect with universal consciousness", icon: GiMeditation, color: "text-blue-500" },
    { name: "Aura Cleansing", description: "Purify your energetic field", icon: GiSolarPower, color: "text-amber-500" },
    { name: "Divine Energy Transfer", description: "Channeling positive universal energy", icon: GiPrayer, color: "text-green-500" },
    { name: "Inner Peace Therapy", description: "Release past trauma and grief", icon: FaBrain, color: "text-indigo-500" },
  ];

  const chakras = [
    { name: "Root Chakra", location: "Base of spine", color: "Red", element: "Earth", icon: GiVibratingShield },
    { name: "Sacral Chakra", location: "Lower abdomen", color: "Orange", element: "Water", icon: GiSolarPower },
    { name: "Solar Plexus", location: "Upper abdomen", color: "Yellow", element: "Fire", icon: HiOutlineSun },
    { name: "Heart Chakra", location: "Center of chest", color: "Green", element: "Air", icon: HiOutlineHeart },
    { name: "Throat Chakra", location: "Throat", color: "Blue", element: "Sound", icon: FaOm },
    { name: "Third Eye", location: "Forehead", color: "Indigo", element: "Light", icon: GiCrystalBall },
    { name: "Crown Chakra", location: "Top of head", color: "Violet", element: "Thought", icon: GiLotus },
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
                  background: `radial-gradient(circle, rgba(255,165,0,0.3) 0%, rgba(255,69,0,0.3) 100%)`,
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
                className="absolute w-0.5 h-0.5 bg-amber-200 rounded-full animate-twinkle"
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
              <GiHealing className="text-amber-300 w-4 h-4" />
              <span className="text-sm font-semibold text-amber-200">Divine Energy Healing</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Spiritual Healer
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Restore harmony between body, mind, and soul with ancient energy healing practices
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Book Healing Session</CTA>
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
                  background: `radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,69,0,0.2) 100%)`,
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
            {/* Left Side - Image (Hand checking/energy healing) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://www.lifehealer.in/images/spirtual/1170.jpg"
                  alt="Spiritual Healer - Energy Healing"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Healing Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <GiHealing className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">Ancient Healing Wisdom</p>
                      <p className="text-xs text-gray-500">Rooted in 5000+ years of Vedic tradition</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-amber-200/50 rounded-full blur-2xl animate-float-slow" />
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
                <span className="text-xs md:text-sm font-semibold text-red-600">Reignite Your Inner Light</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Reignite the Light Within
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Spiritual healing restores harmony between your body, mind, and soul. When energy channels are 
                blocked by stress, negativity, or grief, divine healing rebalances them using sacred vibrations 
                and meditation.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                Our spiritual healer, guided by ancient mantras and intuition, connects you with your inner 
                strength and universal energy — promoting peace, confidence, and spiritual awakening.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GiMeditation className="text-purple-500 w-5 h-5" />
                  <span>Energy Balancing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaHandsHelping className="text-amber-500 w-5 h-5" />
                  <span>Trauma Release</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GiLotus className="text-green-500 w-5 h-5" />
                  <span>Spiritual Growth</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <CTA>Book Healing Session</CTA>
                <Link to="/contact" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                  Free Consultation <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Healing Benefits Section */}
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
              <GiHealing className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Transformative Benefits</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Experience Deep Healing
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Restore balance and awaken your inner potential
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {healingBenefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  className="text-center p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 mx-auto rounded-full ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h4>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
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
              <GiPrayer className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Our Approach</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Holistic Healing Methods
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Combining ancient wisdom with intuitive guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {healingMethods.map((method, idx) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`mt-1 ${method.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chakras Section */}
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
              <GiCrystalBall className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Energy Centers</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              The Seven Chakras
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Balancing your energy centers for optimal well-being
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chakras.map((chakra, idx) => {
              const IconComponent = chakra.icon;
              return (
                <motion.div
                  key={chakra.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="flex items-center gap-3 p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{chakra.name}</h4>
                    <p className="text-xs text-gray-500">{chakra.location}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-gray-400">{chakra.color}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{chakra.element}</span>
                    </div>
                  </div>
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
              <HiOutlineSparkles className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Simple Process</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              How Spiritual Healing Works
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Begin your healing journey in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Share Your Concerns", desc: "Discuss emotional or spiritual blocks", icon: HiOutlineHeart },
              { step: "02", title: "Receive Healing Session", desc: "Remote or in-person energy work", icon: GiHealing },
              { step: "03", title: "Ongoing Guidance", desc: "Practices to maintain balance", icon: GiMeditation },
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
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600">
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
            <GiHealing className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-lg md:text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Book a spiritual healing session today and reconnect with your inner light, peace, and purpose
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Book Healing Session</CTA>
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

export default SpiritualHealer;