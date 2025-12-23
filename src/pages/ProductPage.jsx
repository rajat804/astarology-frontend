import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const products = [
  {
    id: 1,
    name: "3 Face Nepali Rudraksh",
    description: "Authentic Nepali Rudraksh with natural 3 mukhi formation.",
    price: "₹650",
    rating: 5,
    image: assets.threeFace,
  },
  {
    id: 2,
    name: "6 Face Nepali Rudraksh",
    description: "Premium quality 6 mukhi Rudraksh for peace & balance.",
    price: "₹550",
    rating: 5,
    image: assets.sixFace,
  },
  {
    id: 3,
    name: "7 Face Nepali Rudraksh",
    description: "Sacred 7 mukhi Rudraksh symbolizing prosperity.",
    price: "₹550",
    rating: 5,
    image: assets.sevenFace,
  },
  {
    id: 4,
    name: "5 Face Nepali Rudraksh",
    description: "Most popular Panchmukhi Rudraksh for daily wear.",
    price: "₹550",
    rating: 5,
    image: assets.fiveFace,
  },
  {
    id: 5,
    name: "1 Face Kaju Rudraksh",
    description: "Rare Ek Mukhi Kaju Rudraksh with divine energy.",
    price: "₹2000",
    rating: 5,
    image: assets.oneFace,
  },
  {
    id: 6,
    name: "2 Face Nepali Rudraksh",
    description: "Dwimukhi Rudraksh promoting harmony & relationships.",
    price: "₹650",
    rating: 5,
    image: assets.twoFace,
  },
  {
    id: 7,
    name: "4 Face Nepali Rudraksh",
    description: "Chaturmukhi Rudraksh for clarity and creativity.",
    price: "₹550",
    rating: 5,
    image: assets.fourFace,
  },
  {
    id: 8,
    name: "5 Face Nepali Rudraksh Mala (Big Beads)",
    description: "Handcrafted mala with large Panchmukhi beads.",
    price: "₹650",
    rating: 5,
    image: assets.fiveFaceBig,
  },
  {
    id: 9,
    name: "5 Face Nepali Rudraksh Mala (Small Beads)",
    description: "Elegant mala with small-sized Panchmukhi beads.",
    price: "₹500",
    rating: 5,
    image: assets.fiveFaceNepali,
  },
  {
    id: 10,
    name: "Ganesh Nepali Rudraksh",
    description: "Rare Ganesh Rudraksh symbolizing wisdom & success.",
    price: "₹550",
    rating: 5,
    image: assets.ganesh,
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-orange-50 text-gray-900">
      {/* Hero */}
      <section className="py-20 px-6 text-center bg-orange-100">
        <h1 className="text-5xl font-extrabold text-orange-600">
          Sacred Rudraksh Collection
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-700">
          Pure, authentic Nepali Rudraksh for spiritual balance and divine energy.
        </p>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100"
            >
              {/* Vertical Image */}
              <div className="h-80 flex items-center justify-center bg-orange-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>

                <div className="flex mt-3 text-yellow-500">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="mt-4 text-xl font-bold text-orange-600">
                  {product.price}
                </p>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
