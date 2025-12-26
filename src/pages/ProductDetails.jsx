import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Gem,
  Palette,
  RefreshCcw,
  Truck,
} from "lucide-react";
import PRODUCTS from "../data/products"; // <-- Use shared data

export default function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(product?.images?.[0] || "");
  const [qty, setQty] = useState(1);
  const [showDesc, setShowDesc] = useState(true);

  if (!product) return <p className="p-10 text-center">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#2b1535] text-[#FCEBDE] px-6 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

        {/* ================= LEFT IMAGE ================= */}
        <div>
          <div className="relative border border-[#FCEBDE]/30 mb-4">
            {product.discount && !product.inStock && (
              <span className="absolute top-3 left-3 bg-red-600 text-black text-xs px-2 py-1">
                {product.discount}
              </span>
            )}
            {product.discount && product.inStock && (
              <span className="absolute top-3 left-3 bg-orange-500 text-black text-xs px-2 py-1">
                {product.discount}
              </span>
            )}

            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-[520px] object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`border-2 ${
                  activeImage === img
                    ? "border-[#ffcc85]"
                    : "border-[#FCEBDE]/30"
                } overflow-hidden`}
              >
                <img src={img} alt="" className="w-20 h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ================= RIGHT INFO ================= */}
        <div>
          <h1 className="text-3xl font-semibold leading-snug">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400">
              {[...Array(product.rating || 5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs opacity-70">Verified Reviews</span>
          </div>

          <p className="mt-4 text-sm opacity-80">
            {product.subtitle || "Invite spiritual energy and protection"}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-center gap-3">
            {product.oldPrice && (
              <span className="line-through opacity-60">
                Rs. {product.oldPrice}.00
              </span>
            )}
            <span className="text-2xl font-semibold text-[#ffcc85]">
              Rs. {product.price}.00
            </span>
            {product.oldPrice && (
              <span className="bg-orange-500 text-black text-xs px-2 py-1">
                SAVE {Math.round(100 - (product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Color */}
          <div className="mt-6">
            <p className="text-xs mb-2">COLOR: {product.color || "Natural"}</p>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-900 border border-white" />
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex gap-4 items-center">
            <div className="flex border border-[#FCEBDE]/30">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-2">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2"
              >
                <Plus size={14} />
              </button>
            </div>

            <button className="flex-1 border border-[#ffcc85] py-3 flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              ADD TO CART
            </button>
          </div>

          {/* Buy Now */}
          <button className="mt-4 w-full bg-[#3fa173] text-black py-3 font-semibold">
            BUY IT NOW
          </button>

          {/* Trust Icons */}
          <div className="grid grid-cols-4 gap-4 mt-8 text-xs text-center">
            <div><Gem className="mx-auto mb-1" size={18} />PURE GEMS</div>
            <div><Palette className="mx-auto mb-1" size={18} />CUSTOM DESIGN</div>
            <div><RefreshCcw className="mx-auto mb-1" size={18} />RE-FIXING</div>
            <div><Truck className="mx-auto mb-1" size={18} />FREE SHIPPING</div>
          </div>

          {/* Exclusive Offers */}
          <div className="mt-8 border border-[#FCEBDE]/30 p-4">
            <p className="text-xs mb-3">🎁 EXCLUSIVE OFFERS</p>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="border p-2">10% OFF<br /><span className="opacity-70">BUY1</span></div>
              <div className="border p-2">12% OFF<br /><span className="opacity-70">BUY2</span></div>
              <div className="border p-2">15% OFF<br /><span className="opacity-70">BUY3+</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="max-w-7xl mx-auto mt-16 border border-[#FCEBDE]/30">
        <button
          onClick={() => setShowDesc(!showDesc)}
          className="w-full flex justify-between items-center px-6 py-4 text-left"
        >
          <span>Description</span>
          <span>{showDesc ? "−" : "+"}</span>
        </button>

        {showDesc && (
          <div className="px-6 py-6 text-sm opacity-90 space-y-4">
            <p>{product.description || "High-quality authentic Rudraksha beads for spiritual practice."}</p>
            {product.designerNote && (
              <>
                <p className="font-semibold">Designer’s Note</p>
                <p>{product.designerNote}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}