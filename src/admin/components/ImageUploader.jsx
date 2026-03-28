import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUpload, HiOutlineX, HiOutlineTrash } from "react-icons/hi";
import { uploadImage, deleteImage } from "../../services/api";
import toast from "react-hot-toast";

const ImageUploader = ({ images, setImages, multiple = false, maxImages = 5 }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!multiple && files.length > 1) {
      toast.error('Only one image can be uploaded');
      return;
    }
    
    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await uploadImage(formData);
        setImages([...images, response.url]);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
      }
    }
    
    setUploading(false);
  };

  const handleRemoveImage = async (imageUrl, index) => {
    try {
      // Extract publicId from URL if needed
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await deleteImage(publicId);
      setImages(images.filter((_, i) => i !== index));
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove image');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img 
              src={img} 
              alt={`Product ${index + 1}`} 
              className="w-24 h-24 object-cover rounded-lg border border-orange-200"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(img, index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <label className="w-24 h-24 border-2 border-dashed border-orange-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition group">
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <HiOutlineUpload className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
                <span className="text-xs text-gray-400 mt-1">Upload</span>
              </>
            )}
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500">
        {multiple ? `Upload up to ${maxImages} images (JPG, PNG, WebP)` : 'Upload one main image'}
      </p>
    </div>
  );
};

export default ImageUploader;