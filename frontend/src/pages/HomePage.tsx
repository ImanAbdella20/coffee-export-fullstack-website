import React from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import backgroundImage from '../assets/images/1.jpg'

const HomePage = () => {
  return (
    <div 
      className="relative z-10 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Gradient applied directly to the background image */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      {/* Content */}
      <Header />
      <HeroSection />
    </div>
  );
}

export default HomePage;
