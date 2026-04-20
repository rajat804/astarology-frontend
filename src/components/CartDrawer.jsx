import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateItem, removeItem, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty >= 1) {
      updateItem(productId, newQty);
    }
  };

  const handleCheckout = () => {
    onClose();
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-orange-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <HiOutlineShoppingBag className="w-5 h-5" />
                Your Cart ({cart?.totalItems || 0})
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-red-50 transition"
              >
                <HiOutlineX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : !cart?.items?.length ? (
                <div className="text-center py-12">
                  <HiOutlineShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="mt-4 text-red-500 hover:text-red-600 font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex gap-3 p-3 bg-orange-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {item.name}
                        </h3>
                        <p className="text-red-600 font-bold mt-1">
                          ₹{item.price}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, -1)}
                            className="w-7 h-7 bg-white rounded-lg border border-orange-200 hover:bg-red-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity, 1)}
                            className="w-7 h-7 bg-white rounded-lg border border-orange-200 hover:bg-red-50"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="ml-auto p-1 text-red-500 hover:text-red-600"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart?.items?.length > 0 && (
              <div className="border-t border-orange-100 p-4 space-y-3">
                <div className="flex justify-between text-gray-800">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-bold text-red-600">₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-800 pt-2 border-t border-orange-100">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-red-600 text-lg">₹{cart.totalPrice}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;