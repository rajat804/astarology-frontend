import React from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import assets from "../assets/assets";

const products = [
  {
    id: 1,
    name: "3 Face Nepali Rudraksh",
    price: "₹650",
    rating: 5,
    image: assets.threeFace,
    benefits: [
      "Helps release past karmic burdens and guilt",
      "Boosts self-confidence and inner strength",
      "Supports emotional healing and positivity",
    ],
    usage:
      "Wear in a red thread or silver chain after proper energization. Best worn on Monday.",
  },
  {
    id: 2,
    name: "6 Face Nepali Rudraksh",
    price: "₹550",
    rating: 5,
    image: assets.sixFace,
    benefits: [
      "Improves focus, wisdom, and emotional stability",
      "Calms anger and excessive desires",
      "Enhances learning ability and clarity of thought",
    ],
    usage:
      "Recommended for students and professionals. Wear in silk or cotton thread.",
  },
  {
    id: 3,
    name: "7 Face Nepali Rudraksh",
    price: "₹550",
    rating: 5,
    image: assets.sevenFace,
    benefits: [
      "Attracts prosperity and financial stability",
      "Removes obstacles related to money and career",
      "Promotes grounding and discipline",
    ],
    usage:
      "Ideal for business owners. Wear after energizing on a Saturday morning.",
  },
  {
    id: 4,
    name: "5 Face Nepali Rudraksh",
    price: "₹550",
    rating: 5,
    image: assets.fiveFace,
    benefits: [
      "Brings peace of mind and spiritual growth",
      "Balances the five elements within the body",
      "Safe and suitable for daily wear",
    ],
    usage:
      "Can be worn by anyone. Ideal for meditation and daily spiritual practice.",
  },
  {
    id: 5,
    name: "1 Face Kaju Rudraksh",
    price: "₹2000",
    rating: 5,
    image: assets.oneFace,
    benefits: [
      "Represents supreme consciousness and oneness",
      "Enhances deep meditation and spiritual awakening",
      "Helps detach from material distractions",
    ],
    usage:
      "Highly sacred. Should be worn only after proper guidance and energization.",
  },
  {
    id: 6,
    name: "2 Face Nepali Rudraksh",
    price: "₹650",
    rating: 5,
    image: assets.twoFace,
    benefits: [
      "Strengthens relationships and emotional bonding",
      "Promotes harmony between partners",
      "Balances mind and emotions",
    ],
    usage:
      "Recommended for couples. Wear close to the heart in a silver chain.",
  },
  {
    id: 7,
    name: "4 Face Nepali Rudraksh",
    price: "₹550",
    rating: 5,
    image: assets.fourFace,
    benefits: [
      "Enhances creativity and communication skills",
      "Improves memory and intellectual ability",
      "Supports clarity in speech and expression",
    ],
    usage:
      "Ideal for students, teachers, and creatives. Wear during the day.",
  },
  {
    id: 8,
    name: "5 Face Nepali Rudraksh Mala (Big Beads)",
    price: "₹650",
    rating: 5,
    image: assets.fiveFaceBig,
    benefits: [
      "Powerful for meditation and mantra chanting",
      "Helps maintain focus during spiritual practice",
      "Provides calmness and mental stability",
    ],
    usage:
      "Use for daily jap or meditation. Can also be worn as a necklace.",
  },
  {
    id: 9,
    name: "5 Face Nepali Rudraksh Mala (Small Beads)",
    price: "₹500",
    rating: 5,
    image: assets.fiveFaceNepali,
    benefits: [
      "Lightweight and comfortable for daily wear",
      "Promotes peace, balance, and positivity",
      "Suitable for long meditation sessions",
    ],
    usage:
      "Ideal for daily spiritual wear or mantra chanting.",
  },
  {
    id: 10,
    name: "Ganesh Nepali Rudraksh",
    price: "₹550",
    rating: 5,
    image: assets.ganesh,
    benefits: [
      "Removes obstacles and negative energies",
      "Brings wisdom, success, and good fortune",
      "Highly auspicious and rare Rudraksh",
    ],
    usage:
      "Wear after energization. Especially beneficial before starting new ventures.",
  },
];


const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="p-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-orange-50 rounded-2xl p-8 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-[450px] object-contain"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          <div className="flex mt-3 text-yellow-500">
            {[...Array(product.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <p className="text-3xl font-bold text-orange-600 mt-4">
            {product.price}
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            Spiritual Benefits
          </h3>
          <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-2">
            {product.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <h3 className="mt-6 text-xl font-semibold">
            How to Wear
          </h3>
          <p className="mt-2 text-gray-700">{product.usage}</p>

          <button className="mt-8 w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
