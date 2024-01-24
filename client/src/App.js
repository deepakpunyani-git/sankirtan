import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';

import NotFound from './pages/NotFound'; // Import your custom 404 component
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import './assets/styles/pages.css'


const App = () => {
  return (
    <div className='Main'>
    
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />

          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} /> {/* 404 route */}

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;


