import React from 'react';
import AuthWrapper from './AuthWrapper';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <AuthWrapper>
      <div className="auth">
        <div className="back">
          <Link to="/">{'< '}Back</Link>
        </div>
        <div className="container">
          <h2>Login</h2>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
