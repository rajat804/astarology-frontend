import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import ServicesPage from './pages/ServicesPage'
import Classes from './pages/ClassesPage'
import ProductsPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import AuthPage from './pages/AuthPage'
import AdminDashboardShell from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import { AuthProvider } from './context/AuthContext'
import DemoVideoPage from './pages/DemoVideoPage'

const App = () => {
  return (
    <AuthProvider>
    <div>
      <Navbar />
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage/>} />
        <Route path="/courses" element={<Classes/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/demo-video" element={<DemoVideoPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardShell />} />
      </Routes>
      <Footer/>
    </div>
    </AuthProvider>
  )
}

export default App