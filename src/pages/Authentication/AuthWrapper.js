import React from 'react';
import bg from '../../assets/images/auth.svg';
import logo from '../../assets/images/logow.svg';
const AuthWrapper = ({ children }) => {
  return (
    <div className="AuthWrapper">
      <div className="side">
      <img src={logo} className='logo' alt=""/>
        <img src={bg} className='bg' alt="" />
      </div>
      
      {children}
    </div>
  );
};

export default AuthWrapper;
