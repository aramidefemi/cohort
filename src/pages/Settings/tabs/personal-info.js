import React, { useState } from 'react';
import {
  Card,
  Table,
  Input,
  Tabs,
  Avatar,
  Upload,
  message,
  Button,
} from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CameraOutlined } from '@ant-design/icons';

const PersonalInfoSettingsComponent = () => {
  const {
    auth: { user: stock },
    history: { history },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(stock);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    dispatch({
      type: 'SAVE_USER',
      payload: user,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoading(false);
    const form = user;
    form[name] = value;
    setUser(form);
  };
  console.log('process.env', process.env.API_URL);
  const props = {
    name: 'file',
    action: 'https://my-cohort-api.herokuapp.com/image-upload',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} Photo uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} Photo upload failed.`);
      }
      const res = { ...info.file.response };
      const path = { ...res.url };
      handleChange({
        target: {
          name: 'profile_url',
          value: 'https://my-cohort-api.herokuapp.com/' + path.path,
        },
      });
      handleClick();
    },
  };

  return (
    <div className="container">
      <div className="form">
        <div className="profile-photo">
          <Upload {...props}>
            <div className="form-group">
              <label htmlFor="">Upload Image</label>
              <Avatar
                size={150}
                icon={<UserOutlined />}
                src={user.profile_url || ''}
              />

              <Button
                shape="circle"
                className="cam"
                icon={<CameraOutlined />}
              />
            </div>
          </Upload>
        </div>
        <br />
        <div className="col">
          <div className="form-group">
            <label htmlFor="">Full name</label>
            <Input
              placeholder="Full name"
              name="fullname"
              onChange={handleChange}
              defaultValue={user.fullname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email address</label>
            <Input
              placeholder="Email address"
              name="email"
              defaultValue={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Address</label>
            <Input
              placeholder="Enter Address"
              name="address"
              defaultValue={user.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button loading={loading} onClick={handleClick} className="btn primary">
          Save
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoSettingsComponent;
