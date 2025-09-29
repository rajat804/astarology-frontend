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

const App = () => {
  return (
    <div>
      <Navbar />
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage/>} />
        <Route path="/classes" element={<Classes/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/auth" element={<AuthPage/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App