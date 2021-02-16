import React from 'react';
import { Link } from 'react-router-dom';
import cloud from '../../../assets/images/cloud.svg';

const FooterSection = () => {
  return (
    <div className="FooterSection">

      <div className="text">
        <h2>Over 100+ Hospital Network</h2>
        <h4>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non. Non commodo volutpat, pharetra, vel.
        </h4> 
      </div>      
      <div className="image">
        <img src={cloud} alt="" />
        <button className="primary">Learn More</button>
      </div>
    </div>
  );
};

export default FooterSection;
