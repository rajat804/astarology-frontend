// pages/VastuShastra.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  HiOutlineHome, 
  HiOutlineOfficeBuilding, 
  HiOutlineLocationMarker,
  HiOutlineArrowRight,
  HiOutlineSun,
  HiOutlineMoon
} from "react-icons/hi";
import { 
  GiVibratingShield, 
  GiMagicSwirl, 
  GiLotus,
  GiYinYang,
  GiCompass,
  GiWindmill,
  GiCrystalBall
} from "react-icons/gi";
import { FaWind, FaWater, FaFire, FaMountain, FaGlobeAsia } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTA from "../components/common/CTA";

const VastuShastra = () => {
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

  const vastuDirections = [
    { direction: "North (Kubera)", element: "Water", impact: "Wealth, prosperity, career growth", icon: FaWater, color: "text-blue-500", bgColor: "bg-blue-50" },
    { direction: "East (Indra)", element: "Fire", impact: "Health, vitality, new beginnings", icon: FaFire, color: "text-red-500", bgColor: "bg-red-50" },
    { direction: "South (Yama)", element: "Earth", impact: "Stability, strength, reputation", icon: FaMountain, color: "text-green-500", bgColor: "bg-green-50" },
    { direction: "West (Varuna)", element: "Air", impact: "Creativity, relationships, fulfillment", icon: FaWind, color: "text-purple-500", bgColor: "bg-purple-50" },
    { direction: "Northeast (Ishanya)", element: "Ether", impact: "Spirituality, peace, clarity", icon: GiCompass, color: "text-indigo-500", bgColor: "bg-indigo-50" },
    { direction: "Southeast (Agni)", element: "Fire", impact: "Energy, passion, financial gains", icon: FaGlobeAsia, color: "text-orange-500", bgColor: "bg-orange-50" },
    { direction: "Southwest (Nairutya)", element: "Earth", impact: "Relationships, stability, mental peace", icon: GiYinYang, color: "text-amber-500", bgColor: "bg-amber-50" },
    { direction: "Northwest (Vayavya)", element: "Air", impact: "Social connections, travel, opportunities", icon: FaWind, color: "text-cyan-500", bgColor: "bg-cyan-50" },
  ];

  const benefits = [
    { title: "Improved Health", desc: "Reduce stress and enhance physical well-being", icon: GiLotus, color: "text-green-500", bgColor: "bg-green-50" },
    { title: "Financial Growth", desc: "Attract abundance and business success", icon: GiCrystalBall, color: "text-amber-500", bgColor: "bg-amber-50" },
    { title: "Better Relationships", desc: "Harmony between family members", icon: GiYinYang, color: "text-pink-500", bgColor: "bg-pink-50" },
    { title: "Peace of Mind", desc: "Reduce conflicts and mental stress", icon: GiLotus, color: "text-purple-500", bgColor: "bg-purple-50" },
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
              <GiWindmill className="text-yellow-400 w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-200">Ancient Science of Architecture</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Vastu Shastra
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Harmonize your living and working spaces with cosmic energies for peace, prosperity, and well-being
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Book Vastu Visit</CTA>
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
                  src="https://nakshatraganak.com/img/service-3.jpg"
                  alt="Vastu Shastra Consultation"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Direction Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur rounded-xl p-3 md:p-4 shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                      <GiCompass className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-gray-900">8 Directions, 8 Energies</p>
                      <p className="text-xs text-gray-500">Each direction governs specific aspects of life</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {!isMobile && (
                <>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-green-200/50 rounded-full blur-2xl animate-float-slow" />
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
                <span className="text-xs md:text-sm font-semibold text-red-600">The Science of Direction</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-4">
                Balance Your Space, Balance Your Life
              </h2>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                Vastu Shastra aligns your living and working spaces with natural cosmic energies. Every direction, 
                wall, and corner carries an energy that affects your health, relationships, and prosperity.
              </p>
              
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                Our Vastu consultation identifies imbalances and provides effective remedies using traditional 
                methods — without demolition. Create a harmonious flow of positivity that attracts peace and 
                abundance into your environment.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineHome className="text-green-500 w-5 h-5" />
                  <span>Residential Vastu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineOfficeBuilding className="text-blue-500 w-5 h-5" />
                  <span>Commercial Vastu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineLocationMarker className="text-orange-500 w-5 h-5" />
                  <span>Site Selection</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <CTA>Book Vastu Visit</CTA>
                <Link to="/contact" className="px-5 md:px-6 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 inline-flex items-center gap-2">
                  Free Consultation <HiOutlineArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
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
              <GiCompass className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">The 8 Directions</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Understanding Directional Energies
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Each direction in Vastu Shastra is governed by a specific deity and element
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {vastuDirections.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.direction}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-md mb-1">{item.direction}</h4>
                  <p className="text-xs text-gray-500 mb-1">Element: {item.element}</p>
                  <p className="text-xs text-gray-600">{item.impact}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              <GiVibratingShield className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Benefits</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Why Choose Vastu Consultation?
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Experience the transformative power of aligned spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="text-center p-5 bg-white rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 mx-auto rounded-xl ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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

      {/* Remedies Section */}
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
              <span className="text-sm font-semibold text-red-600">Simple Solutions</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Vastu Remedies Without Demolition
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Simple and effective solutions to balance your space
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: GiCrystalBall, title: "Crystal & Pyramid", desc: "Enhance positive energy flow", color: "text-purple-500", bgColor: "bg-purple-50" },
              { icon: GiYinYang, title: "Color Therapy", desc: "Use recommended wall colors", color: "text-pink-500", bgColor: "bg-pink-50" },
              { icon: GiLotus, title: "Plant Placement", desc: "Position indoor plants correctly", color: "text-green-500", bgColor: "bg-green-50" },
            ].map((remedy, idx) => {
              const IconComponent = remedy.icon;
              return (
                <motion.div
                  key={remedy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 mx-auto rounded-full ${remedy.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${remedy.color}`} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{remedy.title}</h4>
                  <p className="text-gray-500 text-sm">{remedy.desc}</p>
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
              <HiOutlineLocationMarker className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">How It Works</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Vastu Consultation Process
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Get your space analyzed and balanced in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Share Details", desc: "Provide property layout and directions", icon: HiOutlineHome },
              { step: "02", title: "Expert Analysis", desc: "On-site or remote Vastu assessment", icon: GiCompass },
              { step: "03", title: "Get Remedies", desc: "Receive actionable solutions without demolition", icon: GiVibratingShield },
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
            <GiVibratingShield className="w-16 h-16 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Harmonize Your Space?
            </h2>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Book a Vastu consultation today and bring peace, prosperity, and positive energy into your home or workplace
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <CTA>Book Vastu Visit</CTA>
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

export default VastuShastra;