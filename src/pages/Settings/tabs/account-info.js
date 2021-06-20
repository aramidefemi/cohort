import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AccountSettingsComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSignOut = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="container">
      <div className="form" style={{ width: '35%' }}>
        <button onClick={showModal} className="btn primary btn-block">
          Change Phone Number
        </button>
        <br />
        <br />
        <br />
        {/* <button onClick={showModal} className="btn primary btn-block">
          Change Password
        </button>
        <br />
        <br />
        <br /> */}
        <Button
          loading={loading}
          onClick={handleSignOut}
          className="btn danger btn-block"
        >
          Sign Out
        </Button>
        <Modal
          title={null}
          footer={null}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ChangePassword />
        </Modal>
      </div>
    </div>
  );
};
const ChangePassword = ({ close }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    dispatch({
      type: 'CHANGE_PASSWORD',
      payload,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoading(false);
    const form = payload;
    form[name] = value;
    setPayload(form);
  };

  return (
    <div className="settings-modal">
      <h4>Change Password</h4>
      <br />
        
        <br />
      <div className="form">
        <div className="form-group">
          <label htmlFor="">Current Password</label>
          <Input
            name="old"
            onChange={handleChange}
            placeholder="Password"
            // suffix={
            //   <Button
            //   loading={loading}
            //   onClick={handleClick}
            //   className="btn primary"
            // >
            //   Send OTP
            // </Button>
            // }
          />
        </div>
        <br />
      
        
        <div className="form-group">
          <label htmlFor="">New Password</label>
          <Input.Password
            name="new"
            onChange={handleChange}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
      </div>
      <br />
        <br />
        <br />
      <Button
        loading={loading}
        onClick={handleClick}
        className="btn primary btn-block"
      >
        Save
      </Button>
      <br/>
      <br/>
      <Button onClick={close} className="btn btn-block outline">
        Cancel
      </Button>
    </div>
  );
};
export default AccountSettingsComponent;
