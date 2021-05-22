import React, { useState } from 'react'; 
import { Upload, message, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
 

const SignUpForm = ({ handleChange, handleClick, step }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState('No File Selected');
  const props = {
    name: 'file',
    action: 'https://my-cohort-api.herokuapp.com/image-upload',
    onChange(info) {
      setUploading(info.file.status);
      if (info.file.status !== 'uploading') {
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
          value: 'https://my-cohort-api.herokuapp.com/' + path.path,
        },
      });
    },
  };
  if (step !== 3) return null;
  return (
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
