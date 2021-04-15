import React, { useState } from 'react';
import AuthWrapper from './Components/AuthWrapper';
import { Input, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message } from 'antd';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState('No File Selected');
  const dispatch = useDispatch();
  const handleClick = () => {
    setLoading(!loading);
    dispatch({
      type: 'SIGN_UP',
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoading(false);
    const form = {};
    form[name] = value;
    dispatch({
      type: 'HANDLE_CHANGE',
      payload: form,
    });
  };

  const props = {
    name: 'file',
    action: 'http://localhost:4000/image-upload',
    onChange(info) {
      setUploading(info.file.status);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      const res = { ...info.file.response };
      const path = { ...res.url };
      handleChange({
        target: {
          name: 'profile_url',
          value: 'http://localhost:4000/' + path.path,
        },
      });
    },
  };

  return (
    <AuthWrapper>
      <div className="container registration">
        <h2>
          Create An Account
          <br />
          <small>
            Please enter your details below. This should only take a couple of
            minutes.
          </small>
        </h2>
        <div className="form">
          <div className="profile-photo">
            <Upload {...props}>
              <div className="form-group">
                <label htmlFor="">Upload Image</label>
                <Input disabled value={uploading} />
                <button className="btn primary">Choose..</button>{' '}
              </div>
            </Upload>
          </div>
          <br />
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
            <Spin spinning={loading} delay={500}>
              <button onClick={handleClick} className="btn primary btn-block">
                Sign Up
              </button>
            </Spin>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
