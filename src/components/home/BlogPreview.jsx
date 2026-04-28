// components/home/BlogPreview.jsx
import React from "react";
import { motion } from "framer-motion";

const BlogPreview = () => {
  const posts = [
    {
      title: "Decoding Your Natal Chart",
      tag: "Astrology",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      title: "Meditation for Busy People",
      tag: "Wellness",
      img: "https://images.unsplash.com/photo-1512303452023-8de2a16ab9aa",
    },
    {
      title: "Choosing Crystals That Work",
      tag: "Crystals",
      img: "https://images.unsplash.com/photo-1513185158878-4ae0380f9cc3",
    },
  ];

  return (
    <section className="py-16 bg-offWhite">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-6 text-green-600">Latest Articles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-orange-100">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 bg-white">
                  <div className="text-xs text-red-600 mb-2 font-semibold">
                    {p.tag}
                  </div>
                  <h4 className="font-semibold text-gray-900">{p.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    A short preview of the article...
                  </p>
                  <button className="mt-3 text-red-600 font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;