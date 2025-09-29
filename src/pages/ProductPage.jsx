import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Tag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Planetary Telescope",
    description: "High-resolution telescope perfect for stargazing.",
    price: "$499",
    rating: 5,
    image: "https://source.unsplash.com/400x400/?telescope,astronomy",
  },
  {
    id: 2,
    name: "Astronaut Suit Replica",
    description: "Premium quality space suit replica for enthusiasts.",
    price: "$899",
    rating: 4,
    image: "https://source.unsplash.com/400x400/?space-suit",
  },
  {
    id: 3,
    name: "Meteorite Fragment",
    description: "Real meteorite fragment with authenticity certificate.",
    price: "$199",
    rating: 5,
    image: "https://source.unsplash.com/400x400/?meteorite,stone",
  },
  {
    id: 4,
    name: "Galaxy Projector",
    description: "Bring the cosmos to your room with immersive projections.",
    price: "$149",
    rating: 4,
    image: "https://source.unsplash.com/400x400/?galaxy,projector",
  },
];

const ProductsPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-orange-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-orange-100">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-orange-600"
        >
          Explore Our Cosmic Products
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Discover premium astronomy-inspired products crafted for dreamers,
          explorers, and stargazers. ✨
        </p>
      </section>

      

      {/* Product Grid */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="flex items-center mt-3 text-yellow-500">
                  {Array.from({ length: product.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-xl font-bold text-orange-600">
                  {product.price}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="bg-orange-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Get 10% Off Your First Order 🚀</h2>
        <p className="mb-6 text-lg">
          Join our stargazer community and receive exclusive offers & cosmic news.
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-l-lg w-full sm:w-auto min-w-[260px] text-white border border-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
          />
          <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-r-lg hover:bg-orange-100">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
