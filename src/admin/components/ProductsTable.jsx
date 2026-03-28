import React from "react";
import { FaStar, FaBoxOpen } from "react-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const ProductsTable = ({ products, searchQuery, onEdit, onDelete }) => {
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Sold</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {filteredProducts.map((p) => (
              <tr key={p._id} className="hover:bg-orange-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">₹{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.stock < 10 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{p.sold}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-gray-600">{p.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEdit(p)}
                      className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                    >
                      <HiOutlinePencilAlt className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(p._id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;