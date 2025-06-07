
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import FeaturedMenu from '../components/organisms/FeaturedMenu';
import About from '../components/organisms/About';
import Footer from '../components/organisms/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <Hero />
      <FeaturedMenu />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
