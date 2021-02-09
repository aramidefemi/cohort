import React from 'react';
import { Link } from 'react-router-dom';
import ladybg from '../../../assets/images/ladybg.svg';

const WhySection = () => {
  return (
    <div className="WhySection">
      <div className="image">
        <img src={ladybg} alt="" />
      </div>
      <div className="text">
        <h2>Why Hadiel?</h2>
        <h4>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non. Non commodo volutpat, pharetra, vel.
        </h4>
        <Link>About Us</Link>
      </div>
    </div>
  );
};

export default WhySection;
