import React from 'react';
import { Link } from 'react-router-dom';
import phone from '../../../assets/images/feature/3310.svg';
import arrow from '../../../assets/images/feature/arrow.svg';

const NetworkSection = () => {
  return (
    <div className="NetworkSection">
      <div className="content">
        <div className="text">
          <h2>Even if you use 3310</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum
            diam orci pretium a pharetra, feugiat cursus. Dictumst risus, sem
            egestas odio cras adipiscing vulputate. Nisi, risus in suscipit non.
            Non commodo volutpat, pharetra, vel.
          </p>
          <Link>
            {' '}
            Get started <img className='arrow' src={arrow} alt="" />
          </Link>
        </div>
        <div className="image">
          <img src={phone} className='phone' alt="" />
        </div>
      </div>
    </div>
  );
};

export default NetworkSection;
