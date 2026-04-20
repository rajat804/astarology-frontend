import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      setCartCount(0);
      return;
    }
    
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data);
      setCartCount(data.totalItems || 0);
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addItem = async (productId, quantity = 1) => {
    try {
      const response = await addToCart(productId, quantity);
      setCart(response.cart);
      setCartCount(response.cart.totalItems);
      toast.success('Item added to cart');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to add item');
      throw error;
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const response = await updateCartItem(productId, quantity);
      setCart(response.cart);
      setCartCount(response.cart.totalItems);
      return response;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to update item');
      throw error;
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.cart);
      setCartCount(response.cart.totalItems);
      toast.success('Item removed from cart');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to remove item');
      throw error;
    }
  };

  const clearAllCart = async () => {
    try {
      await clearCart();
      setCart(null);
      setCartCount(0);
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to clear cart');
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clearAllCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};