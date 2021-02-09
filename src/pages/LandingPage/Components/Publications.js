import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';

const Publications = () => {
  return (
    <div className="publications">
 
      <div className="links">
        <ul>
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
          <li>
            <Link to="/"><img src={logo} alt=""/></Link>
          </li> 
        </ul>
      </div>
   
    </div>
  );
};

export default Publications;
