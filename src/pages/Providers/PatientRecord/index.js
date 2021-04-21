import React, { useState } from 'react';
import { Input, Skeleton, Avatar, List } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const PatientRecord = ({ toggleRecords }) => {
  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);

  const {
    provider: { verified, user },
  } = useSelector((state) => state);
  const [otp, setOTP] = useState(true);

  const handleForm = ({ target: { value } }) => {
    setOTP(value);
  };
  const dispatch = useDispatch();

  const handleSendOTP = () => {
    dispatch({
      type: 'SEND_OTP',
      payload: user.id,
    });
  };

  return (
    <div className="PatientRecordDetails">
      <div className="record">
        <div className="subscriber-img">
          <Avatar
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
            size={164}
            icon={<UserOutlined />}
          />
        </div>
        <div className="details">
          <div className="row">
            <div className="name-group">
              <label>Full name</label>
              <p>Deji Adeniran</p>
            </div>
            <div className="name-group">
              <label>Email Address</label>
              <p>dejiadeniran@email.com</p>
            </div>
          </div>

          <div className="row">
          <div className="name-group">
              <label>Policy number</label>
              <p>028-3824</p>
            </div>
            <div className="name-group">
              <label>Phone number</label>
              <p>080123456789</p>
            </div>
          
          </div>
        
        </div>
        <div className="actions">
          <button
            onClick={() => toggleRecords('DashboardStats')}
            className="btn primary btn-block"
          >
            Save {'&'} Exit Patient Record
          </button>
        </div>
      </div>

      <div className="body">
        <div className="row">
          <h5>Free Benefits</h5>
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={[{},{},{},{},{},{},{},{},]}
            renderItem={(item) => (
              <List.Item>
                <div className="benefits">
                  <p>Ashlynn Levin</p> 
                  <button className="btn primary bg-black">Use</button>
                </div>
              </List.Item>
            )}
          />
        </div>
        <div className="row">
          <h5>Limited Benefits</h5>
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={[{},{},]}
            renderItem={(item) => (
              <List.Item>
                <div className="benefits">
                  <p>Ashlynn Levin</p> 
                  <button className="btn primary">Use</button>
                </div>
              </List.Item>
            )}
          />
        </div>
        <div className="row bg-black">
          <h5>Benefits used in the session <small>Count: <b>0</b></small></h5>

          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={[]}
            renderItem={(item) => (
              <List.Item>
                <div className="benefits">
                  <p>Ashlynn Levin</p>
                  <small>A Minute Ago</small>
                  <button className="btn primary">Re-open</button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default PatientRecord;
