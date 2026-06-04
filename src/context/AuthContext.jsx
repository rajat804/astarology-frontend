import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    console.log('🔍 AuthContext Init - Token:', storedToken ? 'Present' : 'Not present');
    console.log('🔍 AuthContext Init - UserData:', userData);

    if (storedToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
        console.log('✅ User loaded from localStorage:', parsedUser);
      } catch (err) {
        console.error("❌ Invalid user data in localStorage", err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    console.log('🔐 Login called with userData:', userData);
    console.log('🔐 Login called with authToken:', authToken ? authToken.substring(0, 20) + '...' : 'No token');
    
    // Handle different response structures
    let userToStore = null;
    
    if (userData) {
      // Check if userData has user object nested
      if (userData.user) {
        userToStore = {
          _id: userData.user._id || userData.user.id,
          fullName: userData.user.fullName || userData.user.name || 'User',
          email: userData.user.email,
          ...userData.user
        };
      } 
      // Check if userData has _id directly
      else if (userData._id || userData.id) {
        userToStore = {
          _id: userData._id || userData.id,
          fullName: userData.fullName || userData.name || 'User',
          email: userData.email,
          ...userData
        };
      }
      // If userData is string, try to parse
      else if (typeof userData === 'string') {
        try {
          const parsed = JSON.parse(userData);
          userToStore = {
            _id: parsed._id || parsed.id,
            fullName: parsed.fullName || parsed.name || 'User',
            email: parsed.email,
            ...parsed
          };
        } catch (e) {
          console.error('Failed to parse userData:', e);
        }
      }
    }
    
    // Fallback user object
    if (!userToStore) {
      userToStore = {
        _id: 'temp_' + Date.now(),
        fullName: 'User',
        email: 'user@example.com'
      };
    }
    
    console.log('✅ User stored in AuthContext:', userToStore);
    
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userToStore));
    
    setIsAuthenticated(true);
    setUser(userToStore);
    
    toast.success(`Welcome ${userToStore.fullName}!`);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setIsAuthenticated(false);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const getToken = () => localStorage.getItem('token');
  
  const getUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
  };

  const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading, 
      login, 
      logout, 
      getToken,
      getUser,
      isTokenValid
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};