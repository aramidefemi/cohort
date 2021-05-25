import React, { useState } from 'react'; 
import { Upload, message, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
 

const SignUpForm = ({ handleChange, handleClick, step }) => {
  const [loading, setLoading] = useState(false);
 
  if (step !== 3) return null;
  return (
    <div className="form">
   
      <div className="col">
        <div className="form-group">
          <label htmlFor="">Email address</label>
          <Input
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Full name</label>
          <Input
            placeholder="Full name"
            name="fullname"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col">
        <div className="form-group">
          <label htmlFor="">Password</label>
          <Input.Password
            placeholder="Password"
            name="password"
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Phone number</label>
          <Input
            placeholder="Phone number"
            name="phone"
            onChange={handleChange}
          />
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="profile-photo">
        <Button
          loading={loading}
          onClick={handleClick}
          className="btn primary btn-block"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm;
