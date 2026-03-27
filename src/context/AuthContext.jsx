import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    if (token && userData && loginTime) {
      const now = Date.now();
      const timeElapsed = now - parseInt(loginTime, 10);
      const sessionDuration = 3600000; // 1 hour

      if (timeElapsed < sessionDuration) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
        setRemainingTime(sessionDuration - timeElapsed);

        // Set timer for auto logout
        const timer = setTimeout(() => {
          logout();
        }, sessionDuration - timeElapsed);

        // Update remaining time every second
        const interval = setInterval(() => {
          setRemainingTime((prev) => {
            if (prev <= 1000) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1000;
          });
        }, 1000);

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    const now = Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loginTime', now.toString());
    setIsAuthenticated(true);
    setUser(userData);
    setRemainingTime(3600000);

    // Set auto logout timer
    const timer = setTimeout(() => {
      logout();
    }, 3600000);

    // Update remaining time
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setIsAuthenticated(false);
    setUser(null);
    setRemainingTime(0);
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const formatRemainingTime = () => {
    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        remainingTime,
        formatRemainingTime,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);