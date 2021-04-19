import React, { useState } from 'react';
import { Input, Skeleton, Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Redirect,
} from 'react-router-dom';
// images
import go from '../../../assets/images/go.svg';
import bg from '../../../assets/images/bg.svg';
const SearchPatientRecord = ({ toggleRecords }) => {
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState(true);

  const handleForm = ({ target: { value } }) => {
    setLoading(!loading);
    setPolicy(value);
  };
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch({
      type: 'FIND_USER',
      payload: policy,
    });
  };
  return (
    <DashboardWrapper type="provider">
      <div className="PatientRecord" style={{ backgroundImage: `url(${bg})` }}>
        <div className="record">
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Type policy number, card number or email to search subscribers"
              prefix={<SearchOutlined />}
            />
            <p onClick={() => toggleRecords('DashboardStats')}>X</p>
            <img onClick={handleSearch} src={go} className="go" alt="" />
          </div>
          <div className="body">
            {loading ? <Loaders /> : <Details toggleRecords={toggleRecords} />}
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

const Details = ({ toggleRecords }) => {
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
  const handleVerifyOTP = () => {
    dispatch({
      type: 'VERIFY_OTP',
      payload: {
        otp,
      },
    });
  };
  if (verified) {
    return <Redirect to={'/patient-records'} />;
  }

  return (
    <div className="details">
      <div className="subscriber">
        <h4>Results for “028-3842”</h4>
        <img src={user['profile_url']} className="avatar" alt="" />
        {/* <Avatar
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
          size={164}
          icon={<UserOutlined />}
        /> */}
        <div className="name-group">
          <label>Full name</label>
          <p>{user.fullname}</p>
        </div>
        <div className="name-group">
          <label>Card Number</label>
          <p>{user.policyNumber}</p>
        </div>
        <div className="row">
          <div className="name-group">
            <label>Phone number</label>
            <p>{user.phone}</p>
          </div>
          <div className="name-group">
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="row">
 
          <div className="name-group">
            <label>Company Logo</label>
            <p>028-3824</p>
          </div>
        </div>
      </div>
      <div className="actions">
        <button className="btn primary btn-block" onClick={handleSendOTP}>
          Verify Patient
        </button>

        <hr />

        <div className="form-group">
          <label htmlFor="">Enter OTP</label>
          <Input onChange={handleForm} placeholder="Email address" />
        </div>
        <button onClick={handleVerifyOTP} className="btn primary btn-block">
          Verify
        </button>
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
export default SearchPatientRecord;
