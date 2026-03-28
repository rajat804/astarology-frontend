import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import ImageUploader from "./ImageUploader";
import toast from "react-hot-toast";

const ProductFormModal = ({ isOpen, onClose, editingProduct, onCreate, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    images: [],
    type: 'Rudraksha',
    gemstone: 'Rudraksha',
    stock: 10,
    discount: '',
    subtitle: '',
    description: '',
    color: '',
    material: 'Authentic Rudraksha',
    weight: '',
    dimensions: '',
    origin: 'Nepal / India',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        oldPrice: editingProduct.oldPrice || '',
        image: editingProduct.image || '',
        images: editingProduct.images || [],
        type: editingProduct.type || 'Rudraksha',
        gemstone: editingProduct.gemstone || 'Rudraksha',
        stock: editingProduct.stock || 10,
        discount: editingProduct.discount || '',
        subtitle: editingProduct.subtitle || '',
        description: editingProduct.description || '',
        color: editingProduct.color || '',
        material: editingProduct.material || 'Authentic Rudraksha',
        weight: editingProduct.weight || '',
        dimensions: editingProduct.dimensions || '',
        origin: editingProduct.origin || 'Nepal / India',
      });
    } else {
      setFormData({
        name: '',
        price: '',
        oldPrice: '',
        image: '',
        images: [],
        type: 'Rudraksha',
        gemstone: 'Rudraksha',
        stock: 10,
        discount: '',
        subtitle: '',
        description: '',
        color: '',
        material: 'Authentic Rudraksha',
        weight: '',
        dimensions: '',
        origin: 'Nepal / India',
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (images) => {
    setFormData({ ...formData, images: images });
    // Set first image as main image
    if (images.length > 0 && !formData.image) {
      setFormData({ ...formData, images: images, image: images[0] });
    }
  };

  const handleMainImageChange = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill all required fields');
      return;
    }

    const productData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
    };

    if (editingProduct) {
      onUpdate(editingProduct._id, productData);
    } else {
      onCreate(productData);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2">
          <h4 className="text-xl font-bold text-gray-800">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h4>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Premium Rudraksh Mala"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Rudraksha">Rudraksha</option>
                <option value="Mala">Mala</option>
                <option value="Rare">Rare</option>
                <option value="Necklace">Necklace</option>
                <option value="108 Mala">108 Mala</option>
                <option value="Bracelet">Bracelet</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1999"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Old Price (₹)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="2999"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
            <ImageUploader 
              images={formData.images}
              setImages={handleImageChange}
              multiple={true}
              maxImages={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image *</label>
            {formData.images.length > 0 ? (
              <div className="flex gap-3 flex-wrap">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <button
                      type="button"
                      onClick={() => handleMainImageChange(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        formData.image === img ? 'border-red-500 shadow-md' : 'border-orange-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                    {formData.image === img && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded">Main</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Upload images first to select main image</p>
            )}
          </div>

          {/* Inventory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Tag</label>
              <input
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Best Seller, New, Sale"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Short tagline for the product"
              className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Detailed product description"
              className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Brown, Black, etc"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <input
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="Authentic Rudraksha"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Approx. 15-20g"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
              <input
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="8mm beads"
                className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <input
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Nepal / India"
              className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-orange-200 rounded-xl text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-md">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductFormModal;