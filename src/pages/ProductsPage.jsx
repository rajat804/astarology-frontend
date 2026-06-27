import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Filter,
  ChevronDown,
  X
} from "lucide-react";
import { getProducts } from "../services/api";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(5000);
  const [inStock, setInStock] = useState(false);
  const [types, setTypes] = useState([]);
  const [gems, setGems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableGemstones, setAvailableGemstones] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      
      console.log('API Response:', response); // Debug log
      
      // Handle different response structures
      let productsData = [];
      if (response && response.products) {
        productsData = response.products;
      } else if (response && response.data) {
        productsData = response.data;
      } else if (Array.isArray(response)) {
        productsData = response;
      } else {
        productsData = [];
      }
      
      setProducts(productsData);
      
      // Extract unique types and gemstones from products
      const uniqueTypes = [...new Set(productsData.filter(p => p.type).map(p => p.type))];
      const uniqueGemstones = [...new Set(productsData.filter(p => p.gemstone).map(p => p.gemstone))];
      const uniqueCategories = [...new Set(productsData.filter(p => p.category).map(p => p.category))];
      
      setAvailableTypes(uniqueTypes);
      setAvailableGemstones(uniqueGemstones);
      setCategories(uniqueCategories);
      
      // Set max price from products
      if (productsData.length > 0) {
        const maxProductPrice = Math.max(...productsData.map(p => p.price || 0));
        setMaxPrice(maxProductPrice);
        setPrice(maxProductPrice);
      }
      
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

  const clearAllFilters = () => {
    setPrice(maxPrice);
    setInStock(false);
    setTypes([]);
    setGems([]);
  };

  // Get unique categories for display
  const shopCategories = useMemo(() => {
    const cats = [...new Set(products.filter(p => p.category).map(p => p.category))];
    return cats.slice(0, 8).map(cat => ({
      label: cat,
      image: products.find(p => p.category === cat)?.image || null
    }));
  }, [products]);

  // Get trending products (highest rated or most popular)
  const trendingProducts = useMemo(() => {
    return [...products]
      .filter(p => p.discount || p.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }, [products]);

  // Category strip items from database
  const categoryStripItems = useMemo(() => {
    const items = [...new Set(products.filter(p => p.category).map(p => p.category))];
    const additionalItems = ["Top Sellers", "New", ...items];
    return [...new Set(additionalItems)].slice(0, 8);
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-offWhite flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offWhite text-gray-800">
      {/* Shop By Category - Dynamic from DB */}
      {shopCategories.length > 0 && (
        <section className="py-16 text-center bg-white">
          <h2 className="tracking-widest text-sm text-red-600 mb-10 font-semibold">Shop By Category</h2>
          <div className="flex justify-center gap-12 flex-wrap max-w-6xl mx-auto px-6">
            {shopCategories.map((cat) => (
              <div 
                key={cat.label} 
                className="w-28 text-center group cursor-pointer"
                onClick={() => navigate(`/products?category=${cat.label}`)}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-red-200 group-hover:border-red-500 transition bg-gray-100">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingCart size={30} />
                    </div>
                  )}
                </div>
                <p className="text-xs leading-snug text-gray-700">{cat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Strip - Dynamic from DB */}
      {categoryStripItems.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 text-sm font-medium flex justify-center gap-6 flex-wrap">
          {categoryStripItems.map((item) => (
            <span 
              key={item} 
              className="cursor-pointer hover:text-orange-200 transition"
              onClick={() => {
                if (item === "Top Sellers") {
                  // Show top sellers logic
                } else if (item === "New") {
                  // Show new products logic
                } else {
                  navigate(`/products?category=${item}`);
                }
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Trending Section - Dynamic from DB */}
      {trendingProducts.length > 0 && (
        <section className="py-20 text-center bg-orange-50/30">
          <h2 className="text-xl mb-10 text-gray-800">
            2026 The Most <span className="text-red-600">TRENDING</span>
          </h2>
          <div className="flex justify-center gap-12 flex-wrap max-w-6xl mx-auto px-6">
            {trendingProducts.map((product) => (
              <div 
                key={product._id} 
                className="w-80 group cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                {product.discount && (
                  <span className="text-xs bg-red-600 text-white px-3 py-1 inline-block mb-2 rounded-full">
                    {product.discount}
                  </span>
                )}
                <div className="h-96 overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</p>
                <p className="text-xs text-gray-500">From ₹{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
            {filteredProducts.length > 0 && (
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing {filteredProducts.length} products</p>
                {(types.length > 0 || gems.length > 0 || inStock) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <X size={14} /> Clear all filters
                  </button>
                )}
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-red-500 hover:text-red-600 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -8 }}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-orange-100"
                    onClick={() => handleProductClick(product._id)}
                  >
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                        {product.discount}
                      </span>
                    )}

                    <div className="relative overflow-hidden group h-72 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                      {/* {product.inStock && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.success(`${product.name} added to cart`);
                          }}
                          className="absolute bottom-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      )} */}
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold leading-snug text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {product.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{product.subtitle}</p>
                      )}

                      <div className="flex text-yellow-500 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < (product.rating || 4) ? "currentColor" : "none"} />
                        ))}
                      </div>

                      <div className="text-sm">
                        {product.oldPrice && product.oldPrice > product.price && (
                          <span className="line-through mr-2 text-gray-400">
                            Rs. {product.oldPrice}
                          </span>
                        )}
                        <span className="font-semibold text-red-600">
                          Rs. {product.price}
                        </span>
                      </div>
                      
                      {product.type && (
                        <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {product.type}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
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

                {availableTypes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Product Type</h4>
                    {availableTypes.slice(0, 8).map((type) => (
                      <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                          checked={types.includes(type)}
                          onChange={() => toggle(type, types, setTypes)}
                          type="checkbox"
                          className="w-4 h-4 text-red-500 rounded border-orange-300 focus:ring-red-500"
                        /> 
                        <span className="text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3 text-gray-700">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Rs. 0</span>
                    <span>Up to Rs. {price}</span>
                  </div>
                </div>

                {availableGemstones.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">Gemstones</h4>
                    {availableGemstones.slice(0, 6).map((gem) => (
                      <label key={gem} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                          checked={gems.includes(gem)}
                          onChange={() => toggle(gem, gems, setGems)}
                          type="checkbox"
                          className="w-4 h-4 text-red-500 rounded border-orange-300 focus:ring-red-500"
                        /> 
                        <span className="text-gray-600">{gem}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {(types.length > 0 || gems.length > 0 || inStock) && (
                <button
                  onClick={clearAllFilters}
                  className="mt-6 w-full py-2 text-center text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;