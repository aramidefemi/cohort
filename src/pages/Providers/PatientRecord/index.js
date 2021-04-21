import React, { useState } from 'react';
import { Input, Skeleton, Avatar, List } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PatientRecord = ({ toggleRecords }) => {
  const {
    provider: { verified, user, subscription },
  } = useSelector((state) => state);
  const [benefits, setBenefits] = useState(subscription.benefits);
  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);

  const [otp, setOTP] = useState(true);

  const handleForm = ({ target: { value } }) => {
    setOTP(value);
  };
  const dispatch = useDispatch();

  const handleBenefitsUse = () => {};
  const handleBenefitsUndoUse = () => {};

  const saveRecords = () => {
    dispatch({
      type: 'SAVE_RECORDS',
      payload: {
        benefits,
        history
      },
    });
  };

  if (!verified) {
    return <Redirect to={'/provider'} />;
  }

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
              <p>{user.fullname}</p>
            </div>
            <div className="name-group">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="row">
            <div className="name-group">
              <label>Policy number</label>
              <p>{user.policyNumber}</p>
            </div>
            <div className="name-group">
              <label>Phone number</label>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <button
            onClick={saveRecords}
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
            dataSource={benefits || []}
            renderItem={(item) => {
              const { title, privileges, limited } = item;
              if (!limited) {
                return (
                  <List.Item>
                    <div className="benefits">
                      <p>{title}</p> 
                  <button onClick={()=>handleBenefitsUse(item)} className="btn primary bg-black">Use</button>
                    </div>
                  </List.Item>
                );
              }
            }}
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
            dataSource={benefits || []}
            renderItem={(item) => {
              const { title, privileges, limited } = item;
              if (limited) {
                return (
                  <List.Item>
                    <div className="benefits">
                      <p>{title}</p>
                      <button onClick={()=>handleBenefitsUse(item)} className="btn primary">Use</button>
                    </div>
                  </List.Item>
                );
              }
            }}
          />
        </div>
        <div className="row bg-black">
          <h5>
            Benefits used in the session{' '}
            <small>
              Count: <b>0</b>
            </small>
          </h5>

          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={history || []}
            renderItem={(item) => {
              const { title, privileges, limited } = item;
               
                return (
                  <List.Item>
                    <div className="benefits">
                      <p>{title}</p>
                      <button onClick={()=>handleBenefitsUndoUse(item)} className="btn primary Remove">Use</button>
                    </div>
                  </List.Item>
                );
              
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
