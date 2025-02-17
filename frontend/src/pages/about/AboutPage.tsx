import React from 'react';
import coffeevideo from '../../assets/images/coffee.mp4';
import Header from '../../component/Header';
import OurStory from './OurStory';
import Team from './Team';
import Mission from './Mission'; 
import { useTranslation } from 'react-i18next'; 

const AboutPage: React.FC = () => {
    const { t } = useTranslation();

  return (
    <div>

      {/* About Header Section with the Video */}
      <section className="about-header relative h-screen">
        <video className="background-video w-full h-full object-cover" autoPlay muted loop>
          <source src={coffeevideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Gradient Overlay */}
        <div className="gradient-overlay absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
        
       {/* About Us Title */}
       <h1 className="aboutus absolute text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          {t('about.title')}
        </h1>
         
      </section>


    




      {/* Sections for each part of the About Page */}
      <section id="our-story">
        <OurStory/>
      </section>

      <section id="our-team">
      <Team/>
      </section>

      <section id="our-mission">
      <Mission/>
      </section>
    </div>
  );
};

export default AboutPage;
