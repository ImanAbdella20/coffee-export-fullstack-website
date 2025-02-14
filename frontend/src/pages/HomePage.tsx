import React, { useState } from 'react';
import Header from '../component/Header';
import HeroSection from '../component/HeroSection';
import backgroundImage from '../assets/images/1.jpg';
import backgroundImage2 from '../assets/images/4.png';
import backgroundImage3 from '../assets/images/3.jpg';

const HomePage = () => {
  // Initializing state to track the background index
  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);
  
  // Array of background images
  const backgroundImages = [backgroundImage, backgroundImage2, backgroundImage3];

  // Function to handle the arrow clicks
  const handleClickArrow = (direction: string) => {
    setBackgroundIndex((prevIndex) => {
      // If direction is 'prev', go to the previous image
      if (direction === 'prev') {
        return prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1;
      }
      // If direction is 'next', go to the next image
      else if (direction === 'next') {
        return prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex;
    });
  };

  return (
    <div
      className="relative z-10 min-h-screen bg-cover bg-center"
      style={{
        // Set the background image dynamically based on the index
        backgroundImage: `url(${backgroundImages[backgroundIndex]})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

      {/* HeroSection with the handleClickArrow prop */}
      <HeroSection handleClickArrow={handleClickArrow} />
    </div>
  );
};

export default HomePage;
