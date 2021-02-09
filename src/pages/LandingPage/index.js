import React from 'react';
import Header from './Components/Header';
import Publications from './Components/Publications';
import WhySection from './Components/WhySection';

const LandingPage = () => {
  return (
    <div className="landingpage">
      <Header />
      <Publications />
      <WhySection />
    </div>
  );
};

export default LandingPage;
