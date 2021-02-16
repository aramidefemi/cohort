import React from 'react';
import { Link } from 'react-router-dom';
import cloud from '../../../assets/images/cloud.svg';

const NetworkSection = () => {
  return (
    <div className="NetworkSection">
      <div className="text">
        <h2>Over 100+ Hospital Network</h2>
        <h4>We work and partner with hospitals aall over Nigeria</h4>
      </div>
      <div className="image">
        <img src={cloud} alt="" />
      </div>
      <div className="action">
        <button className="primary">Learn More</button>
      </div>
    </div>
  );
};

export default NetworkSection;
