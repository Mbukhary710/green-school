import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MissionVision from '../components/MissionVision';
import WhyChoose from '../components/WhyChoose';
import ContactUs from '../components/ContactUs';
import PhotoGallery from '../components/PhotoGallery';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <MissionVision />
      <WhyChoose />
      <PhotoGallery />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Landing;
