// ProductDetails.jsx
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
  Shield,
  Heart,
  Share2,
} from "lucide-react";
import PRODUCTS from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(product?.images?.[0] || "");
  const [qty, setQty] = useState(1);
  const [showDesc, setShowDesc] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return (
    <div className="min-h-screen bg-offWhite flex items-center justify-center">
      <p className="text-gray-500 text-lg">Product not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-offWhite">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ================= LEFT IMAGE SECTION ================= */}
          <div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100 mb-4">
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  {product.discount}
                </span>
              )}
              {!product.inStock && (
                <span className="absolute top-4 left-4 bg-gray-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Out of Stock
                </span>
              )}

              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`border-2 rounded-lg overflow-hidden transition ${
                    activeImage === img
                      ? "border-red-500 shadow-md"
                      : "border-orange-200 hover:border-red-300"
                  }`}
                >
                  <img src={img} alt="" className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ================= RIGHT INFO SECTION ================= */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <h1 className="text-3xl font-bold text-gray-800 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < (product.rating || 4) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-xs text-gray-500">(124 Verified Reviews)</span>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.subtitle || "Invite spiritual energy and protection with this authentic, handcrafted piece."}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              {product.oldPrice && (
                <span className="line-through text-gray-400 text-lg">
                  Rs. {product.oldPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-red-600">
                Rs. {product.price}
              </span>
              {product.oldPrice && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  SAVE {Math.round(100 - (product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Color/Material */}
            {product.color && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">MATERIAL / COLOR</p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-orange-50 text-gray-700 rounded-lg text-sm border border-orange-200">
                    {product.color}
                  </span>
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <div className="flex border border-orange-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2 hover:bg-orange-50 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 py-2 border-x border-orange-200 text-gray-800 font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2 hover:bg-orange-50 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition shadow-md">
                  <ShoppingCart size={18} />
                  ADD TO CART
                </button>
              </div>

              <button className="w-full border-2 border-red-500 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
                BUY IT NOW
              </button>

              <div className="flex gap-4 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition py-2">
                  <Heart size={18} />
                  Wishlist
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 hover:text-red-500 transition py-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-orange-100">
              <div className="text-center">
                <Gem className="mx-auto mb-2 text-red-500" size={20} />
                <p className="text-xs text-gray-600">PURE GEMS</p>
              </div>
              <div className="text-center">
                <Palette className="mx-auto mb-2 text-red-500" size={20} />
                <p className="text-xs text-gray-600">CUSTOM DESIGN</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="mx-auto mb-2 text-red-500" size={20} />
                <p className="text-xs text-gray-600">RE-FIXING</p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-red-500" size={20} />
                <p className="text-xs text-gray-600">FREE SHIPPING</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS SECTION ================= */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="flex border-b border-orange-100">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 font-medium transition ${
                activeTab === "description"
                  ? "text-red-600 border-b-2 border-red-600 bg-orange-50"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-4 font-medium transition ${
                activeTab === "details"
                  ? "text-red-600 border-b-2 border-red-600 bg-orange-50"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`px-6 py-4 font-medium transition ${
                activeTab === "shipping"
                  ? "text-red-600 border-b-2 border-red-600 bg-orange-50"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{product.description || "High-quality authentic Rudraksha beads for spiritual practice and meditation. Each bead is carefully selected and blessed to enhance your spiritual journey."}</p>
                {product.designerNote && (
                  <>
                    <h4 className="font-semibold text-gray-800 mt-4">Designer's Note</h4>
                    <p>{product.designerNote}</p>
                  </>
                )}
                <div className="bg-orange-50 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Enhances spiritual connection and meditation practice</li>
                    <li>Brings peace, clarity, and protection</li>
                    <li>Authentic, ethically sourced materials</li>
                    <li>Handcrafted by skilled artisans</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-3 text-gray-600">
                <div className="grid grid-cols-2 gap-4">
                  <div className="py-2 border-b border-orange-100">
                    <span className="font-semibold text-gray-800">Material:</span>
                    <p className="mt-1">{product.material || "Authentic Rudraksha"}</p>
                  </div>
                  <div className="py-2 border-b border-orange-100">
                    <span className="font-semibold text-gray-800">Weight:</span>
                    <p className="mt-1">{product.weight || "Approx. 15-20g"}</p>
                  </div>
                  <div className="py-2 border-b border-orange-100">
                    <span className="font-semibold text-gray-800">Dimensions:</span>
                    <p className="mt-1">{product.dimensions || "8mm beads"}</p>
                  </div>
                  <div className="py-2 border-b border-orange-100">
                    <span className="font-semibold text-gray-800">Origin:</span>
                    <p className="mt-1">{product.origin || "Nepal / India"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <Truck className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Free Shipping</h4>
                    <p>Free standard shipping on all orders within India. Delivery in 3-7 business days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCcw className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Easy Returns</h4>
                    <p>30-day return policy. If you're not satisfied, return within 30 days for a full refund.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="text-red-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Authenticity Guarantee</h4>
                    <p>Every product comes with a certificate of authenticity and quality guarantee.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= EXCLUSIVE OFFERS ================= */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-200">
          <p className="text-sm font-semibold text-red-600 mb-4">🎁 EXCLUSIVE OFFERS</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-lg font-bold text-red-600">10% OFF</div>
              <div className="text-xs text-gray-500">on purchase of 1 item</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-lg font-bold text-red-600">12% OFF</div>
              <div className="text-xs text-gray-500">on purchase of 2 items</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-lg font-bold text-red-600">15% OFF</div>
              <div className="text-xs text-gray-500">on purchase of 3+ items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}