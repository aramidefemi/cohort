import React, { useState } from 'react';
import { Input, Skeleton, Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

// images
import go from '../../../assets/images/go.svg';
const SearchPatientRecord = ({ toggleRecords }) => {
  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);
  return (
    <div className="PatientRecord">
      <div className="record">
        <div className="searchbar">
          <Input
            autoFocus
            placeholder="Type policy number, card number or email to search subscribers"
            prefix={<SearchOutlined />}
          />
          <p onClick={toggleRecords}>X</p>
          <img onClick={toggleLoading} src={go} className="go" alt="" />
        </div>
        <div className="body">{loading ? <Loaders /> : <Details />}</div>
      </div>
    </div>
  );
};

const Loaders = () => {
  return (
    <div className="Loaders">
      <div>
        <Skeleton.Avatar size={164} active shape="circle" />
        <br />
        <br />
        <Skeleton active />
        <Skeleton active />
      </div>
      <div className="centered">
        <Skeleton.Input style={{ width: 200 }} active />
        <Skeleton.Input style={{ width: 200 }} active />
      </div>
    </div>
  );
};

const Details = ({}) => {
  return (
    <div className="details">
      <div className="subscriber">
        <h4>Results for “028-3842”</h4>
        <Avatar
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
          size={164}
          icon={<UserOutlined />}
        />
        <div className="name-group">
          <label>Full name</label>
          <p>Deji Adeniran</p>
        </div>
        <div className="name-group">
          <label>Card Number</label>
          <p>028-3824</p>
        </div>
        <div className="row">
          <div className="name-group">
            <label>Phone number</label>
            <p>080123456789</p>
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
            <label>Company Logo</label>
            <p>028-3824</p>
          </div>
        </div>
      </div>
      <div className="actions">
        <button className="btn primary btn-block">Verify Patient</button>
        
        <hr />
        
        <div className="form-group">
          <label htmlFor="">Enter OTP</label>
          <Input placeholder="Email address" />
        </div>
        <button className="btn primary btn-block">Verify</button>
      </div>
    </div>
  );
};

export default SearchPatientRecord;
