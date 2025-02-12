import React from 'react';
import { Outlet } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <Outlet /> {/* This will render the correct nested route */}
    </div>
  );
};

export default AboutPage;
