import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlinePlus, 
  HiOutlinePencilAlt, 
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineUpload,
  HiOutlinePhotograph
} from 'react-icons/hi';
import { 
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceStats,
  uploadServiceImage,
  deleteServiceImage
} from '../../services/api';
import toast from 'react-hot-toast';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    originalPrice: '',
    discount: '',
    duration: '60 mins',
    category: 'vedic-astrology',
    icon: '🔮',
    image: '',
    imagePublicId: '',
    features: [],
    isPopular: false,
    order: 0
  });
  const [featureInput, setFeatureInput] = useState('');

  const categoryOptions = [
    { id: 'vedic-astrology', name: 'Vedic Astrology', icon: '🔮' },
    { id: 'numerology', name: 'Numerology', icon: '🔢' },
    { id: 'face-reading', name: 'Face Reading', icon: '👤' },
    { id: 'vastu', name: 'Vastu Shastra', icon: '🏠' },
    { id: 'paranormal', name: 'Paranormal', icon: '👻' },
    { id: 'spiritual-healing', name: 'Spiritual Healing', icon: '🕉️' }
  ];

  const durationOptions = [
    '30 mins', '45 mins', '60 mins', '90 mins', '2 hours', '3 hours', '1 week', '2 weeks', '1 month'
  ];

  const iconOptions = [
    { value: '🔮', label: '🔮 Crystal Ball' },
    { value: '🔢', label: '🔢 Numbers' },
    { value: '👤', label: '👤 Face' },
    { value: '🏠', label: '🏠 House' },
    { value: '👻', label: '👻 Ghost' },
    { value: '🕉️', label: '🕉️ Om' },
    { value: '⭐', label: '⭐ Star' },
    { value: '🌙', label: '🌙 Moon' },
    { value: '☀️', label: '☀️ Sun' },
    { value: '💫', label: '💫 Sparkle' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getAllServices();
      setServices(data.services || []);
      
      try {
        const statsData = await getServiceStats();
        setStats(statsData.stats);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }
    
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await uploadServiceImage(formData);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          image: response.imageUrl,
          imagePublicId: response.publicId
        }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async () => {
    if (formData.imagePublicId) {
      try {
        await deleteServiceImage(formData.imagePublicId);
        setFormData(prev => ({
          ...prev,
          image: '',
          imagePublicId: ''
        }));
        toast.success('Image removed');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to remove image');
      }
    } else {
      setFormData(prev => ({ ...prev, image: '', imagePublicId: '' }));
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        shortDescription: service.shortDescription,
        price: service.price,
        originalPrice: service.originalPrice || '',
        discount: service.discount || 0,
        duration: service.duration,
        category: service.category,
        icon: service.icon,
        image: service.image || '',
        imagePublicId: service.imagePublicId || '',
        features: service.features || [],
        isPopular: service.isPopular || false,
        order: service.order || 0
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        originalPrice: '',
        discount: '',
        duration: '60 mins',
        category: 'vedic-astrology',
        icon: '🔮',
        image: '',
        imagePublicId: '',
        features: [],
        isPopular: false,
        order: 0
      });
    }
    setShowModal(true);
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.shortDescription || !formData.price) {
      toast.error('Please fill all required fields');
      return;
    }
    
    let discount = formData.discount;
    if (formData.originalPrice && !discount) {
      discount = Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100);
    }
    
    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      discount: discount || 0,
      order: parseInt(formData.order) || 0
    };
    
    try {
      if (editingService) {
        await updateService(editingService._id, serviceData);
        toast.success('Service updated successfully');
      } else {
        await createService(serviceData);
        toast.success('Service created successfully');
      }
      setShowModal(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error(error.response?.data?.message || 'Failed to save service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await deleteService(id);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Service Management</h3>
          <p className="text-sm text-gray-500 mt-1">Create and manage astrology services</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-500">Total Services</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalServices || services.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-500">Active Services</p>
            <p className="text-2xl font-bold text-green-600">{stats.activeServices || services.filter(s => s.isActive !== false).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-2xl font-bold text-blue-600">{stats.categories || categoryOptions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-orange-100">
            <p className="text-sm text-gray-500">Price Range</p>
            <p className="text-2xl font-bold text-purple-600">
              ₹{stats.minPrice || 0} - ₹{stats.maxPrice || 0}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {services.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No services found. Click "Add Service" to create your first service.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-orange-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {service.image ? (
                          <img src={service.image} alt={service.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="text-2xl">{service.icon}</div>
                        )}
                        <div>
                          <div className="font-medium text-gray-800">{service.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{service.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-semibold text-gray-800">{formatPrice(service.price)}</span>
                        {service.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            {formatPrice(service.originalPrice)}
                          </span>
                        )}
                        {service.discount > 0 && (
                          <span className="ml-2 px-1 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                            {service.discount}% OFF
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {service.duration}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.isActive !== false
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {service.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                      {service.isPopular && (
                        <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(service)}
                          className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                          title="Edit"
                        >
                          <HiOutlinePencilAlt className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2">
                <h4 className="text-xl font-bold text-gray-800">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h4>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <HiOutlineX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
                  <div className="flex items-center gap-4">
                    {formData.image ? (
                      <div className="relative">
                        <img src={formData.image} alt="Service" className="w-24 h-24 rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <HiOutlineX className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition"
                      >
                        <HiOutlinePhotograph className="w-8 h-8 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Upload</span>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-500">Uploading...</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-400">Recommended: 500x500px, Max 2MB</p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Kundli Analysis"
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {categoryOptions.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {durationOptions.map(dur => (
                        <option key={dur} value={dur}>{dur}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., 5100"
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="e.g., 7100"
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      placeholder="Auto-calculated"
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    rows="2"
                    placeholder="Brief description (shown on cards)"
                    maxLength="120"
                    className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.shortDescription.length}/120 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    placeholder="Detailed description of the service..."
                    className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    required
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features / What's Included</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="e.g., Detailed birth chart analysis"
                      className="flex-1 px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        ✓ {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="ml-1 text-green-500 hover:text-green-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                        className="w-4 h-4 text-red-500 rounded"
                      />
                      <span className="text-sm text-gray-700">Mark as Popular</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-orange-200 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-md"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceManager;