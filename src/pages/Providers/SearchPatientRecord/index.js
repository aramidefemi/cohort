import React, { useState } from 'react';
import { Input, Skeleton, Avatar, Spin } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// images
import go from '../../../assets/images/go.svg';
import bg from '../../../assets/images/bg.svg';
const SearchPatientRecord = ({ toggleRecords }) => {
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState(true);
  const {
    provider: { found },
  } = useSelector((state) => state);
  const handleForm = ({ target: { value } }) => {
    setLoading(true);
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
            <img onClick={handleSearch} src={go} className="go" alt="" />
          </div>
          <div className="body">
            {loading && !found ? (
              <Loaders />
            ) : (
              <Details toggleRecords={toggleRecords} />
            )}
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
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const handleForm = ({ target: { value } }) => {
    setOTP(value);
  };
  const dispatch = useDispatch();

  const handleSendOTP = () => {
    setLoadingSend(true);
    setTimeout(function () {
      setLoadingSend(false);
    }, 3000);

    dispatch({
      type: 'SEND_OTP',
      payload: user.id,
    });
  };
  const handleVerifyOTP = () => {
    setLoadingVerify(true);
    setTimeout(function () {
      setLoadingVerify(false);
    }, 3000);

    dispatch({
      type: 'VERIFY_OTP',
      payload: {
        otp,
        id: user.id,
      },
    });
  };

  if (verified) {
    return <Redirect to={'/patient-records'} />;
  }

  return (
    <div className="details">
      {!user ? (
        <p>No results, Subscriber does not exist</p>
      ) : (
        <>
          <div className="subscriber">
            {' '}
            <div className="row">
              {/* <img src={user['profile_url']} className="avatar" alt="" /> */}
              <Avatar
                style={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
                size={200}
                icon={<UserOutlined />}
              />
              <div className="col">
                <div className="name-group">
                  <label>Full name</label>
                  <p>{user.fullname}</p>
                </div>
                <div className="name-group">
                  <label>Policy Number</label>
                  <p>{user.policyNumber}</p>
                </div>

                <div className="name-group">
                  <label>Phone number</label>
                  <p>{user.phone}</p>
                </div>
                <div className="name-group">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <Spin tip="Sending OTP..." spinning={loadingSend}>
              <button className="btn primary btn-block" onClick={handleSendOTP}>
                Send OTP
              </button>
            </Spin>

            <hr />

            <div className="form-group">
              <label htmlFor="">Enter OTP</label>
              <Input onChange={handleForm} placeholder="Email address" />
            </div>

            <Spin spinning={loadingVerify}>
              <button
                onClick={handleVerifyOTP}
                className="btn primary btn-block"
              >
                Verify
              </button>
            </Spin>
          </div>
        </>
      )}
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
      </div>
      <div className="centered">
        <Skeleton active />
      </div>
    </div>
  );
};
export default SearchPatientRecord;
