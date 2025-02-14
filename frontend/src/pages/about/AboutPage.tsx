import React from 'react';
import { Link } from 'react-router-dom';
import OurStory from './OurStory';   // Import the components
import Team from './Team';
import Mission from './Mission';
import Contact from '../contact/contact';
import coffeevideo from '../../assets/images/coffee.mp4'

const AboutPage: React.FC = () => {
  return (
    <div>

<section className="about-header ">
        <video className="background-video w-full" autoPlay muted loop>
          <source src={coffeevideo} type="video/mp4" />
          Your browser does not support the video tag.
          <h1 className="aboutus">About Us</h1>
        </video>
      
      </section>

      {/* Sections for each part of the About Page */}
      <section id="our-story">
        <OurStory />
      </section>

      <section id="our-team">
        <Team />
      </section>

      <section id="our-mission">
        <Mission />
      </section>
    </div>
  );
};

export default AboutPage;
