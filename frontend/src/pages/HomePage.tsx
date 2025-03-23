import React, { useState } from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import backgroundImage from '../assets/images/1.jpg';
import backgroundImage2 from '../assets/images/4.png';
import backgroundImage3 from '../assets/images/3.jpg';
import FeaturedCoffee from './featuredcoffee/featuredCoffee';

const HomePage = () => {
  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);

  const backgroundImages = [backgroundImage, backgroundImage2, backgroundImage3];

  const handleClickArrow = (direction: string) => {
    setBackgroundIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1;
      } else if (direction === 'next') {
        return prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex;
    });
  };

  return (
    <>
      <div
        className={`relative z-10 bg-cover bg-center transition-all duration-500 ${
          backgroundIndex === 1 ? 'min-h-[50vh]' : 'min-h-screen'
        }`}
        style={{
          backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

        {/* Hero Section */}
        <HeroSection handleClickArrow={handleClickArrow} />
      </div>

      {/* Featured Coffee Section */}
      <FeaturedCoffee />
    </>
  );
};

export default HomePage;
