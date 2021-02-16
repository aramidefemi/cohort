import React from 'react';
import { Link } from 'react-router-dom';
import sm from '../../../assets/images/testimonial/sm.svg';
import bg from '../../../assets/images/testimonial/bg.svg';
import logo from '../../../assets/images/logo.svg';

const TestimonySection = () => {
  return (
    <div className="TestimonySection">
      <div className="title">
        <img src={bg} className="bg" alt="" />
        <h2>
          Real Stories from
          <br />
          Real Customers
        </h2>
        <h4>Get inspired by these stories.</h4>
      </div>

      <div className="testimonies">
        <div className="testimony">
          <img src={logo} className="bg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default TestimonySection;
