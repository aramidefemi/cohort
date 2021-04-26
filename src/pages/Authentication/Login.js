import React, { useState } from 'react';
import AuthWrapper from './Components/AuthWrapper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading);
    dispatch({
      type: 'SIGN_IN',
    });
  };
  
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setLoading(false);
    const form = {};
    form[name] = value;
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: form,
    });
  };

  return (
    <AuthWrapper>
      <div className="container">
        <h2>Login</h2>
        <div className="form">
          <div className="form-group">
            <label htmlFor="">Email address</label>
            <Input
              placeholder="Email address"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <Input.Password
              name="password"
              onChange={handleChange}
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <Link to="/provider" className="fwp">
            Forgot Password?
          </Link>
          <Spin spinning={loading}>
            <button className="btn primary btn-block" onClick={handleClick}>Login</button>
          </Spin>
          <p>
            Don{'’'}t have an account?{' '}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
