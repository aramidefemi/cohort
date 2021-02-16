import React from 'react';
import { Link } from 'react-router-dom';
import a from '../../../assets/images/feature/a.svg';
import b from '../../../assets/images/feature/b.svg';
import c from '../../../assets/images/feature/c.svg';
import d from '../../../assets/images/feature/d.svg';

const AboutSection = () => {
  return (
    <div className="AboutSection">
      <h2>About Our Health Plans</h2>
      <div className="abouts">
        <div className="about">
          <img src={a} alt="" />
          <div className="title">
            <h5>Individual Subscription</h5>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
              sed nam sem tellus erat.
            </h4>
          </div>
        </div>
        <div className="about">
          <img src={b} alt="" />
          <div className="title">
            <h5>Individual Subscription</h5>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
              sed nam sem tellus erat.
            </h4>
          </div>
        </div>
        <div className="about">
          <img src={c} alt="" />
          <div className="title">
            <h5>Individual Subscription</h5>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
              sed nam sem tellus erat.
            </h4>
          </div>
        </div>
        <div className="about">
          <img src={d} alt="" />
          <div className="title">
            <h5>Individual Subscription</h5>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis et
              sed nam sem tellus erat.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
