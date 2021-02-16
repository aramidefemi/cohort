import React from 'react';
import Header from './Components/Header';
import Publications from './Components/Publications';
import WhySection from './Components/WhySection';
import NetworkSection from './Components/NetworkSection';
import TestimonySection from './Components/TestimonySection';
import AboutSection from './Components/AboutSection';
import CTASection from './Components/CTASection';
import FooterSection from './Components/FooterSection';

const LandingPage = () => {
  return (
    <div className="landingpage">
      <Header />
      <Publications />
      <WhySection />
      <NetworkSection />
      <AboutSection />
      <TestimonySection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
