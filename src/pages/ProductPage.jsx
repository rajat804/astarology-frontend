import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import assets from "../assets/assets";

/* =========================================================
   SHOP BY CATEGORY DATA
========================================================= */
const SHOP_CATEGORIES = [
  {
    label: "Pyrite bracelet with magnetic closure",
    image: "https://justwowfactory.com/cdn/shop/files/Opulence_Drawer_Pyrite_Bracelet.webp?v=1742467045&width=200",
  },
  { label: "Top Sellers", image:"https://justwowfactory.com/cdn/shop/files/new_red_string_stainless_sriyantra_bracelet2.webp?v=1756282989&width=200" },
  { label: "Sriyantra", image :"https://justwowfactory.com/cdn/shop/files/MajesticSimplicityPyriteBraceletformen.webp?v=1743496608&width=200"},
  { label: "Pyrite", image: "https://justwowfactory.com/cdn/shop/collections/7_chakra_obsidian_bracelet_3.webp?v=1765620347&width=200" },
  { label: "Shiva", image: "https://justwowfactory.com/cdn/shop/files/Divine_Shelter_Mahadev_Pendant_Rudraksha_Tiger_Eye_Mala_Mala.webp?v=1764667541&width=200" },
];

/* =========================================================
   TRENDING DATA
========================================================= */
const TRENDING = [
  {
    tag: "2026 (Calm)",
    image:"https://justwowfactory.com/cdn/shop/files/2026_Five_Elements_Calm_Harmoniser_Bracelet1.webp?v=1762926421&width=1200",
    title: "Five Elements Calm Harmoniser Bracelet",
  },
  {
    tag: "2026 (Wealth)",
    image: "https://justwowfactory.com/cdn/shop/files/Five_ELements_Wealth_Harmoniser_BRACELET3.webp?v=1762926640&width=1200",
    title: "Five Elements Wealth Harmoniser Bracelet",
  },
];

/* =========================================================
   PRODUCT DATA
========================================================= */


/* ================== PRODUCT DATA ================== */
const PRODUCTS = [
  {
    id: 1,
    name: "3 Face Nepali Rudraksh",
    price: 650,
    oldPrice: 999,
    rating: 5,
    image: assets.threeFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
    discount: "Best Seller",
  },
  {
    id: 2,
    name: "6 Face Nepali Rudraksh",
    price: 550,
    rating: 5,
    image: assets.sixFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 3,
    name: "7 Face Nepali Rudraksh",
    price: 550,
    rating: 5,
    image: assets.sevenFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 4,
    name: "5 Face Nepali Rudraksh",
    price: 550,
    rating: 5,
    image: assets.fiveFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 5,
    name: "1 Face Kaju Rudraksh",
    price: 2000,
    rating: 5,
    image: assets.oneFace,
    type: "Rare",
    gemstone: "Rudraksha",
    inStock: false,
    discount: "Sold Out",
  },
  {
    id: 6,
    name: "2 Face Nepali Rudraksh",
    price: 650,
    rating: 5,
    image: assets.twoFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 7,
    name: "4 Face Nepali Rudraksh",
    price: 550,
    rating: 5,
    image: assets.fourFace,
    type: "Rudraksha",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 8,
    name: "5 Face Rudraksh Mala (Big Beads)",
    price: 650,
    rating: 5,
    image: assets.fiveFaceBig,
    type: "Mala",
    gemstone: "Rudraksha",
    inStock: true,
    discount: "New",
  },
  {
    id: 9,
    name: "5 Face Rudraksh Mala (Small Beads)",
    price: 500,
    rating: 5,
    image: assets.fiveFaceNepali,
    type: "Mala",
    gemstone: "Rudraksha",
    inStock: true,
  },
  {
    id: 10,
    name: "Ganesh Nepali Rudraksh",
    price: 550,
    rating: 5,
    image: assets.ganesh,
    type: "Rare",
    gemstone: "Rudraksha",
    inStock: true,
  },
];

/* =========================================================
   SHOP PAGE
========================================================= */
export default function ShopPage() {
  const [price, setPrice] = useState(2799);
  const [inStock, setInStock] = useState(false);
  const [types, setTypes] = useState([]);
  const [gems, setGems] = useState([]);

  const toggle = (value, state, setState) => {
    setState(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (p.price > price) return false;
      if (inStock && !p.inStock) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (gems.length && !gems.includes(p.gemstone)) return false;
      return true;
    });
  }, [price, inStock, types, gems]);

  return (
    <div className="min-h-screen bg-[#2b1535] text-[#FCEBDE]">

      {/* ================= SHOP BY CATEGORY ================= */}
      <section className="py-16 text-center">
        <h2 className="tracking-widest text-sm mb-10">Shop By Category</h2>
        <div className="flex justify-center gap-12 flex-wrap">
          {SHOP_CATEGORIES.map((cat) => (
            <div key={cat.label} className="w-28 text-center group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border border-[#FCEBDE]/30">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <p className="text-xs leading-snug">{cat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CATEGORY STRIP ================= */}
      <div className="bg-gradient-to-r from-[#f6a04d] to-[#ffb463] text-[#2b1535] py-3 text-sm font-medium flex justify-center gap-6 flex-wrap">
        {["Top Sellers", "New", "Numerology", "Zodiac", "Planetary", "Citrine", "Rudraksha"].map(
          (t) => (
            <span key={t}>{t}</span>
          )
        )}
      </div>

      {/* ================= TRENDING ================= */}
      <section className="py-20 text-center">
        <h2 className="text-xl mb-10">
          2026 The Most <span className="text-[#ffcc85]">TRENDING</span>
        </h2>
        <div className="flex justify-center gap-12 flex-wrap">
          {TRENDING.map((t) => (
            <div key={t.title} className="w-80">
              <span className="text-xs bg-green-600 px-2 py-1 inline-block mb-2">
                {t.tag}
              </span>
              <div className="h-96 overflow-hidden border border-[#FCEBDE]/30">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <p className="mt-3 text-sm">{t.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAIN SHOP ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

        {/* ================= PRODUCTS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              className="relative border border-[#FCEBDE]/30 p-3"
            >
              {p.badge && (
                <span className="absolute top-3 left-3 bg-orange-500 text-xs px-2 py-1 text-black">
                  {p.badge}
                </span>
              )}

              <div className="relative overflow-hidden group h-64 mb-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                {p.inStock && (
                  <button className="absolute bottom-3 right-3 bg-[#FCEBDE] text-[#2b1535] p-2 opacity-0 group-hover:opacity-100 transition">
                    <ShoppingCart size={16} />
                  </button>
                )}
              </div>

              <h3 className="text-sm font-semibold leading-snug">{p.name}</h3>

              <div className="flex text-yellow-400 my-2">
                {[...Array(p.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>

              <div className="text-sm">
                {p.oldPrice && (
                  <span className="line-through mr-2 text-gray-400">
                    Rs. {p.oldPrice}
                  </span>
                )}
                <span className="font-semibold text-[#ffcc85]">
                  Rs. {p.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= FILTERS ================= */}
        <aside className="space-y-10 text-sm">
          <h3 className="font-semibold">Sale Products</h3>

          <div>
            <h4 className="font-semibold mb-2">Availability</h4>
            <label className="block">
              <input type="checkbox" onChange={() => setInStock(!inStock)} /> In
              Stock
            </label>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Product type</h4>
            {["108 Mala", "Mala", "Necklace"].map((t) => (
              <label key={t} className="block">
                <input onChange={() => toggle(t, types, setTypes)} type="checkbox" /> {t}
              </label>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-2">Price</h4>
            <input
              type="range"
              min="0"
              max="2799"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
            <p className="mt-1">Rs. 0 — Rs. {price}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Gemstones</h4>
            {["Clear Quartz", "Hematite", "Rudraksha", "Citrine"].map((g) => (
              <label key={g} className="block">
                <input onChange={() => toggle(g, gems, setGems)} type="checkbox" /> {g}
              </label>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
