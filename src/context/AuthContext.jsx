// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    const loginTime = localStorage.getItem("loginTime");
    const now = Date.now();

    if (savedAuth === "true" && loginTime) {
      const timeElapsed = now - parseInt(loginTime, 10);
      const sessionDuration = 3600000; // 1 hour in ms
      if (timeElapsed < sessionDuration) {
        setIsAuthenticated(true);
        setRemainingTime(sessionDuration - timeElapsed);

        const timer = setTimeout(() => {
          logout();
        }, sessionDuration - timeElapsed);

        const interval = setInterval(() => {
          setRemainingTime((prev) => prev - 1000);
        }, 1000);

        return () => {
          clearTimeout(timer);
          clearInterval(interval);
        };
      } else {
        logout();
      }
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    const now = Date.now();
    localStorage.setItem("auth", "true");
    localStorage.setItem("loginTime", now.toString());
    setRemainingTime(3600000);

    const timer = setTimeout(() => {
      logout();
    }, 3600000);

    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
    }, 1000);

    navigate("/");
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRemainingTime(0);
    localStorage.removeItem("auth");
    localStorage.removeItem("loginTime");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, remainingTime, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);