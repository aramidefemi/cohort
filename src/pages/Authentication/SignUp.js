import React from 'react';
import AuthWrapper from './AuthWrapper';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const SignUp = () => {
  return (
    <AuthWrapper>
      <div className="container">
        <h2>Login</h2>
        <div className="form">
          <div className="form-group">
            <label htmlFor="">Email address</label>
            <Input placeholder="Email address" />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <Link to="/forgot-password" className='fwp'>Forgot Password?</Link>
          <button className="btn primary btn-block">Login</button>
          <p>
            Don{'’'}t have an account?{' '}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
