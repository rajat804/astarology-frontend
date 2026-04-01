// components/home/Products.jsx
import React, { useState } from "react";
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

  const items = [
    {
      id: "p1",
      name: "Premium Rudraksh Mala",
      price: "₹1,799",
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1606813902914-272f09fa0f79",
      badge: "Handpicked",
      icon: Gem,
      iconColor: "text-amber-600",
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
      iconColor: "text-purple-500",
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
      iconColor: "text-orange-600",
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

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/30">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Crystals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`crystal-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={30 + Math.random() * 40} className="text-purple-300/20" />
          </motion.div>
        ))}
        
        {/* Floating Particles */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-300 to-orange-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Gem className="text-red-500 w-4 h-4" />
              <span className="text-sm font-semibold text-red-600">Sacred Treasures</span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Featured Products
            </h3>
            <p className="text-gray-600 mt-2">
              Ethically sourced, quality-checked spiritual tools for your journey
            </p>
          </div>
          <motion.div 
            className="hidden md:flex gap-3 mt-4 md:mt-0"
            whileHover={{ scale: 1.05 }}
          >
            <button className="px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View catalogue
            </button>
            <CTA>Go to Shop</CTA>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((p, i) => {
            const IconComponent = p.icon;
            const isHovered = hoveredProduct === p.id;
            
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredProduct(p.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"
                  animate={{ opacity: isHovered ? 0.3 : 0 }}
                />
                
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100">
                  {/* Image Container with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Badge with Animation */}
                    <motion.div
                      className="absolute left-3 top-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-1.5"
                      whileHover={{ scale: 1.05, x: 3 }}
                      animate={p.featured ? { 
                        scale: [1, 1.05, 1],
                        backgroundColor: ["rgba(255,255,255,0.95)", "rgba(255,240,240,0.95)", "rgba(255,255,255,0.95)"]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {p.featured && <Flame className="w-3 h-3 text-red-500" />}
                      {p.badge}
                    </motion.div>

                    {/* Quick View Button */}
                    <motion.button
                      className="absolute bottom-3 right-3 bg-white/95 backdrop-blur p-2 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuick(p)}
                    >
                      <Eye className="w-4 h-4 text-red-500" />
                    </motion.button>

                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconComponent className={`w-4 h-4 ${p.iconColor}`} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                        {p.name}
                      </h4>
                      <motion.div 
                        className="text-red-600 font-bold text-xl"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                      >
                        {p.price}
                      </motion.div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < Math.floor(p.rating) 
                                ? "text-yellow-500 fill-yellow-500" 
                                : idx < p.rating 
                                ? "text-yellow-500 fill-yellow-500 opacity-60" 
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {p.rating.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-400">· {p.stock}+ sold</div>
                    </div>

                    {/* Spiritual Property */}
                    <motion.div 
                      className="flex items-center gap-2 text-xs"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span className="text-gray-500">{p.spiritual}</span>
                    </motion.div>

                    {/* Benefits (Visible on Hover) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                          {p.benefits.map((benefit, idx) => (
                            <motion.div
                              key={benefit}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.07 }}
                              className="flex items-center gap-1.5 text-xs text-gray-600"
                            >
                              <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                              <span>{benefit}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Features */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-green-500" />
                        <span>Ethical</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3 text-blue-500" />
                        <span>Fast ship</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-purple-500" />
                        <span>Authentic</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        onClick={() => setQuick(p)}
                        className="px-3 py-2 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 text-sm flex-1 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-3 h-3" />
                        Quick view
                      </motion.button>
                      <motion.button
                        onClick={() => addToCart(p)}
                        className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {addedToCart[p.id] ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3" />
                            Add to Cart
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {quick && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setQuick(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={() => setQuick(null)}
                    className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-80 md:h-full">
                      <img
                        src={quick.img}
                        alt={quick.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-2xl font-bold text-gray-900">{quick.name}</h4>
                        <div className="text-2xl font-bold text-red-600">{quick.price}</div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center text-sm">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 ${
                                idx < Math.floor(quick.rating) 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : idx < quick.rating 
                                  ? "text-yellow-500 fill-yellow-500 opacity-60" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{quick.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-400">· {quick.stock}+ sold</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        High quality, ethically sourced item with authenticity notes and care instructions. 
                        Each piece is carefully selected for its spiritual properties and energy.
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span>100% Authentic & Certified</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Truck className="w-4 h-4" />
                          <span>Free shipping on orders above ₹999</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <Shield className="w-4 h-4" />
                          <span>7-day return policy</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => {
                            addToCart(quick);
                            setQuick(null);
                          }}
                          className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </motion.button>
                        <motion.button
                          onClick={() => setQuick(null)}
                          className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue Shopping
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;