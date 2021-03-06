import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt=""/>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/evaluation">Evaluation</Link>
          </li>
          <li>
            <Link to="/">Providers</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="actions">
         
            <Link to="/login" className='btn'>Login</Link>
           
            <Link to="/evaluation" className='btn primary'>Sign up</Link>
          
      </div>
    </div>
  );
};

export default Navbar;
