import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Filter,
  ChevronDown,
} from "lucide-react";
import assets from "../assets/assets";
import { getProducts } from "../services/api";
import toast from "react-hot-toast";

const SHOP_CATEGORIES = [
  {
    label: "Pyrite bracelet with magnetic closure",
    image: "https://justwowfactory.com/cdn/shop/files/Opulence_Drawer_Pyrite_Bracelet.webp?v=1742467045&width=200",
  },
  { label: "Top Sellers", image: "https://justwowfactory.com/cdn/shop/files/new_red_string_stainless_sriyantra_bracelet2.webp?v=1756282989&width=200" },
  { label: "Sriyantra", image: "https://justwowfactory.com/cdn/shop/files/MajesticSimplicityPyriteBraceletformen.webp?v=1743496608&width=200" },
  { label: "Pyrite", image: "https://justwowfactory.com/cdn/shop/collections/7_chakra_obsidian_bracelet_3.webp?v=1765620347&width=200" },
  { label: "Shiva", image: "https://justwowfactory.com/cdn/shop/files/Divine_Shelter_Mahadev_Pendant_Rudraksha_Tiger_Eye_Mala_Mala.webp?v=1764667541&width=200" },
];

const TRENDING = [
  {
    tag: "2026 (Calm)",
    image: "https://justwowfactory.com/cdn/shop/files/2026_Five_Elements_Calm_Harmoniser_Bracelet1.webp?v=1762926421&width=1200",
    title: "Five Elements Calm Harmoniser Bracelet",
  },
  {
    tag: "2026 (Wealth)",
    image: "https://justwowfactory.com/cdn/shop/files/Five_ELements_Wealth_Harmoniser_BRACELET3.webp?v=1762926640&width=1200",
    title: "Five Elements Wealth Harmoniser Bracelet",
  },
];

export default function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(2799);
  const [inStock, setInStock] = useState(false);
  const [types, setTypes] = useState([]);
  const [gems, setGems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (value, state, setState) => {
    setState(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.price > price) return false;
      if (inStock && !p.inStock) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (gems.length && !gems.includes(p.gemstone)) return false;
      return true;
    });
  }, [products, price, inStock, types, gems]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite text-gray-800">
      {/* Shop By Category */}
      <section className="py-16 text-center bg-white">
        <h2 className="tracking-widest text-sm text-red-600 mb-10 font-semibold">Shop By Category</h2>
        <div className="flex justify-center gap-12 flex-wrap max-w-6xl mx-auto px-6">
          {SHOP_CATEGORIES.map((cat) => (
            <div key={cat.label} className="w-28 text-center group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-red-200 group-hover:border-red-500 transition">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <p className="text-xs leading-snug text-gray-700">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Strip */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 text-sm font-medium flex justify-center gap-6 flex-wrap">
        {["Top Sellers", "New", "Numerology", "Zodiac", "Planetary", "Citrine", "Rudraksha"].map(
          (t) => (
            <span key={t} className="cursor-pointer hover:text-orange-200 transition">
              {t}
            </span>
          )
        )}
      </div>

      {/* Trending */}
      <section className="py-20 text-center bg-orange-50/30">
        <h2 className="text-xl mb-10 text-gray-800">
          2026 The Most <span className="text-red-600">TRENDING</span>
        </h2>
        <div className="flex justify-center gap-12 flex-wrap max-w-6xl mx-auto px-6">
          {TRENDING.map((t) => (
            <div key={t.title} className="w-80 group cursor-pointer">
              <span className="text-xs bg-red-600 text-white px-3 py-1 inline-block mb-2 rounded-full">
                {t.tag}
              </span>
              <div className="h-96 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-800">{t.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Shop */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-semibold"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
            <ChevronDown size={18} className={`transform transition ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          {/* Products */}
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -8 }}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-orange-100"
                  onClick={() => handleProductClick(p._id)}
                >
                  {p.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      {p.discount}
                    </span>
                  )}

                  <div className="relative overflow-hidden group h-72">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    {p.inStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute bottom-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-semibold leading-snug text-gray-800 line-clamp-2">
                      {p.name}
                    </h3>

                    <div className="flex text-yellow-500 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < (p.rating || 4) ? "currentColor" : "none"} />
                      ))}
                    </div>

                    <div className="text-sm">
                      {p.oldPrice && (
                        <span className="line-through mr-2 text-gray-400">
                          Rs. {p.oldPrice}
                        </span>
                      )}
                      <span className="font-semibold text-red-600">
                        Rs. {p.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Filters */}
          <aside className={`space-y-8 text-sm ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b border-orange-100 pb-2">
                Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Availability</h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={inStock} 
                      onChange={() => setInStock(!inStock)}
                      className="w-4 h-4 text-red-500 rounded border-orange-300 focus:ring-red-500"
                    /> 
                    <span className="text-gray-600">In Stock Only</span>
                  </label>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Product Type</h4>
                  {["Rudraksha", "Mala", "Necklace", "Bracelet", "108 Mala", "Rare"].map((t) => (
                    <label key={t} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        checked={types.includes(t)}
                        onChange={() => toggle(t, types, setTypes)}
                        type="checkbox"
                        className="w-4 h-4 text-red-500 rounded border-orange-300 focus:ring-red-500"
                      /> 
                      <span className="text-gray-600">{t}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="2799"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Rs. 0</span>
                    <span>Rs. {price}</span>
                    <span>Rs. 2799</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Gemstones</h4>
                  {["Clear Quartz", "Hematite", "Rudraksha", "Citrine"].map((g) => (
                    <label key={g} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        checked={gems.includes(g)}
                        onChange={() => toggle(g, gems, setGems)}
                        type="checkbox"
                        className="w-4 h-4 text-red-500 rounded border-orange-300 focus:ring-red-500"
                      /> 
                      <span className="text-gray-600">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}