import React from 'react';
import bg from '../../../assets/images/auth.svg';
import logo from '../../../assets/images/logow.svg';
import { Link } from 'react-router-dom';
const AuthWrapper = ({ children }) => {
  return (
    <div className="AuthWrapper">
      <div className="side" style={{ backgroundImage: 'url(' + bg + ')' }}>
        <img src={logo} className="logo" alt="" />
      </div>
      <div className="auth">
        <div className="back">
          <Link to="/">{'< '}Back</Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
