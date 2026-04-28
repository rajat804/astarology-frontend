// components/home/Products.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Gem, 
  Leaf, 
  Truck, 
  Shield, 
  Eye, 
  ShoppingCart, 
  X, 
  CheckCircle, 
  Flame,
  Crown,
  Sparkles
} from "lucide-react";
import CTA from "../common/CTA";

const Products = () => {
  const [quick, setQuick] = useState(null);
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
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
    {
      id: "p1",
      name: "Premium Rudraksh Mala",
      price: "₹1,799",
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1606813902914-272f09fa0f79",
      badge: "Handpicked",
      icon: Gem,
      iconColor: "text-amber-400",
      benefits: ["Spiritual Protection", "Mental Clarity", "Stress Relief"],
      spiritual: "Sacred Beads",
      stock: 15,
      featured: true
    },
    {
      id: "p2",
      name: "Clear Quartz Cluster",
      price: "₹1,299",
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1587394204583-19a3a7a2a4a2",
      badge: "Certified",
      icon: Sparkles,
      iconColor: "text-purple-400",
      benefits: ["Energy Amplifier", "Healing Properties", "Clarity Enhancement"],
      spiritual: "Master Healer",
      stock: 23,
      featured: false
    },
    {
      id: "p3",
      name: "Copper Yantra Plate",
      price: "₹2,199",
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1589739907150-b89e3f7b2b58",
      badge: "Limited",
      icon: Crown,
      iconColor: "text-orange-400",
      benefits: ["Vastu Balance", "Positive Energy", "Prosperity"],
      spiritual: "Sacred Geometry",
      stock: 8,
      featured: true
    },
  ];

  const addToCart = (p) => {
    setCart((c) => [...c, p]);
    setAddedToCart({ [p.id]: true });
    setTimeout(() => {
      setAddedToCart({});
    }, 2000);
  };

  // Reduce background animations on mobile/low-end
  const showBackgroundAnimations = !isLowEndDevice;
  const particleCount = isLowEndDevice ? 15 : isMobile ? 30 : 60;
  const crystalCount = isLowEndDevice ? 3 : isMobile ? 5 : 8;

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated Background - Reduced on mobile */}
      {showBackgroundAnimations && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Crystals - Reduced count */}
          {[...Array(crystalCount)].map((_, i) => (
            <div
              key={`crystal-${i}`}
              className="absolute animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`,
              }}
            >
              <Sparkles size={20 + Math.random() * 30} className="text-amber-400/10" />
            </div>
          ))}
          
          {/* Floating Particles - Reduced count */}
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-0.5 h-0.5 bg-gradient-to-r from-amber-400 to-purple-400 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4 border border-amber-500/30">
              <Gem className="text-amber-400 w-3 h-3 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-semibold text-amber-400">Sacred Treasures</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-sm md:text-base text-gray-400 mt-1 md:mt-2">
              Ethically sourced, quality-checked spiritual tools for your journey
            </p>
          </div>
          {!isMobile && (
            <div className="hidden md:flex gap-3 mt-4 md:mt-0">
              <button className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl border-2 border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all duration-300 flex items-center gap-2 text-sm md:text-base">
                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                View catalogue
              </button>
              <CTA>Go to Shop</CTA>
            </div>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {items.map((p, i) => {
            const IconComponent = p.icon;
            const isHovered = hoveredProduct === p.id;
            
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  duration: 0.4, 
                  delay: isLowEndDevice ? 0 : i * 0.08,
                  ease: "easeOut"
                }}
                whileHover={!isMobile ? { y: -6 } : {}}
                onHoverStart={() => !isMobile && setHoveredProduct(p.id)}
                onHoverEnd={() => !isMobile && setHoveredProduct(null)}
                className="relative group"
              >
                {/* Glow Effect - Disabled on mobile */}
                {!isMobile && (
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${isHovered ? 'opacity-30' : ''}`} />
                )}
                
                <div className="relative bg-gray-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-500/20">
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className={`absolute left-3 top-3 bg-gray-900/95 backdrop-blur px-2 md:px-3 py-1 rounded-lg md:rounded-xl text-[10px] md:text-xs font-semibold shadow-lg flex items-center gap-1 border border-amber-500/30 text-amber-400 ${p.featured ? 'animate-pulse-subtle' : ''}`}>
                      {p.featured && <Flame className="w-2 h-2 md:w-3 md:h-3 text-amber-400" />}
                      {p.badge}
                    </div>

                    {/* Quick View Button */}
                    <button
                      className="absolute bottom-3 right-3 bg-gray-900/95 backdrop-blur p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg hover:scale-110 transition-transform border border-amber-500/30"
                      onClick={() => setQuick(p)}
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                    </button>

                    {/* Floating Icon */}
                    <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur rounded-full p-1.5 md:p-2 shadow-lg border border-white/10">
                      <IconComponent className={`w-3 h-3 md:w-4 md:h-4 ${p.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 space-y-2 md:space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-white text-sm md:text-base lg:text-lg leading-tight">
                        {p.name}
                      </h4>
                      <div className="text-amber-400 font-bold text-base md:text-xl">
                        {p.price}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="flex items-center text-xs md:text-sm">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3 h-3 md:w-3.5 md:h-3.5 ${
                              idx < Math.floor(p.rating) 
                                ? "text-yellow-500 fill-yellow-500" 
                                : idx < p.rating 
                                ? "text-yellow-500 fill-yellow-500 opacity-60" 
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-400 font-medium">
                        {p.rating.toFixed(1)}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">· {p.stock}+ sold</div>
                    </div>

                    {/* Spiritual Property */}
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs">
                      <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                      <span className="text-gray-400">{p.spiritual}</span>
                    </div>

                    {/* Benefits - Only show on desktop hover */}
                    {!isMobile && (
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1 overflow-hidden"
                          >
                            {p.benefits.map((benefit, idx) => (
                              <div
                                key={benefit}
                                className="flex items-center gap-1 text-[10px] md:text-xs text-gray-400"
                              >
                                <CheckCircle className="w-2 h-2 md:w-2.5 md:h-2.5 text-emerald-400" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Features */}
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-gray-500 pt-1 flex-wrap">
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <Leaf className="w-2 h-2 md:w-3 md:h-3 text-emerald-400" />
                        <span>Ethical</span>
                      </div>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <Truck className="w-2 h-2 md:w-3 md:h-3 text-cyan-400" />
                        <span>Fast ship</span>
                      </div>
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-600"></span>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <Shield className="w-2 h-2 md:w-3 md:h-3 text-purple-400" />
                        <span>Authentic</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3 md:mt-4">
                      <button
                        onClick={() => setQuick(p)}
                        className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all duration-300 text-[10px] md:text-xs flex-1 flex items-center justify-center gap-1 md:gap-2"
                      >
                        <Eye className="w-2 h-2 md:w-3 md:h-3" />
                        Quick view
                      </button>
                      <button
                        onClick={() => addToCart(p)}
                        className="flex-1 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-xs"
                      >
                        {addedToCart[p.id] ? (
                          <>
                            <CheckCircle className="w-2 h-2 md:w-3 md:h-3" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-2 h-2 md:w-3 md:h-3" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick View Modal - Same functionality, optimized */}
        <AnimatePresence>
          {quick && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setQuick(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-500/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setQuick(null)}
                    className="absolute top-3 right-3 z-10 bg-gray-900/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-gray-700 transition border border-amber-500/30"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                  </button>
                  
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-full">
                      <img
                        src={quick.img}
                        alt={quick.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 md:p-8">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h4 className="text-xl md:text-2xl font-bold text-white">{quick.name}</h4>
                        <div className="text-xl md:text-2xl font-bold text-amber-400">{quick.price}</div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <div className="flex items-center text-sm">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3 h-3 md:w-4 md:h-4 ${
                                idx < Math.floor(quick.rating) 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : idx < quick.rating 
                                  ? "text-yellow-500 fill-yellow-500 opacity-60" 
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-400">{quick.rating.toFixed(1)}</span>
                        <span className="text-xs md:text-sm text-gray-500">· {quick.stock}+ sold</span>
                      </div>
                      
                      <p className="text-sm md:text-base text-gray-400 mb-4 leading-relaxed">
                        High quality, ethically sourced item with authenticity notes and care instructions. 
                        Each piece is carefully selected for its spiritual properties and energy.
                      </p>
                      
                      <div className="space-y-2 md:space-y-3 mb-5 md:mb-6">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-400">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                          <span>100% Authentic & Certified</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-cyan-400">
                          <Truck className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Free shipping on orders above ₹999</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-purple-400">
                          <Shield className="w-3 h-3 md:w-4 md:h-4" />
                          <span>7-day return policy</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            addToCart(quick);
                            setQuick(null);
                          }}
                          className="flex-1 px-4 md:px-6 py-2 md:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => setQuick(null)}
                          className="px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold hover:bg-gray-700 transition text-sm md:text-base"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-particle {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(-60px);
            opacity: 0;
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-float-particle {
          animation: float-particle ease-in-out infinite;
          will-change: transform, opacity;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Products;