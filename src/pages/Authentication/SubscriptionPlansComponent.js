import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { CheckCircleFilled, CaretDownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Collapse } from 'antd';

import {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
} from '../../common/plans';
import { usePaystackPayment } from 'react-paystack';
import { Link } from 'react-router-dom';

const SubscriptionPlansComponent = () => {
  const {
    auth: { user },
  } = useSelector((state) => state);
  const [show, toggleShow] = useState(false);
  const [config, setConfig] = useState({ init: false });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleClick = () => {
    toggleShow(!show);
  };
  const dispatch = useDispatch();
  const initializePayment = usePaystackPayment(config);

  const startPaystack = (amount, planName) => {
    amount = amount * 100;
    const reference = new Date().getTime() +''+ Math.floor(Math.random() * 100000000).toString();
    const metadata = user;
    const email = user.email;

    setConfig({
      publicKey: 'pk_test_a1fcc1525836d8ca7c23abb658d0a99d3c3ce067',
      reference,
      metadata,
      planName,
      amount,
      email,
      init: true,
    });
  };

  useEffect(() => {
    if (config.init) {
      initializePayment(onSuccess, onClose);
    }
  });

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('reference from onSuccess', reference);
    setConfig({
      reference,
      init: false,
    });
    dispatch({
      type: 'ACTIVATE_PLAN',
      payload: {
        payment: reference,
        user,
        planName: config.planName,
      },
    });
    toggleModal();
  };

  // you can call this function anything
  const onClose = (e) => {
    setConfig({
      ...config,
      init: false,
    });
  };

  return (
    <DashboardWrapper type="subscribe">
      <div className="subscribe">
        <div className="title">
          <h2>Subscription Plans</h2>
        </div>
        <div className="plans">
          <section>
            <Plan {...one} isBest startPaystack={startPaystack} />
            <Plan {...two} startPaystack={startPaystack} />
            <Plan {...three} startPaystack={startPaystack} />
          </section>
          <div className="btn-st">
            <button className="btn primary btn-block " onClick={handleClick}>
              Show {show ? 'Less' : 'All'} Plans{' '}
              <CaretDownOutlined style={{ color: '#ffffff' }} />
            </button>
          </div>

          {show ? (
            <section>
              {[one, two, three, four, five, six, seven, eight, nine, ten].map(
                (item, key) => (
                  <Plan key={key} {...item} startPaystack={startPaystack} />
                )
              )}
            </section>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Modal
        title={null}
        footer={null}
        visible={isModalVisible}
        onOk={toggleModal}
        onCancel={toggleModal}
      >
        <br />
        <p>
          Your payment has been {config?.reference?.message}, we are setting up
          your subscription and we would send you an sms once we are done.
        </p>
        <br />
        <br />
        <p>
          <Link to="/subscriber">Click here to Proceed to your dashboard</Link>
        </p>
      </Modal>
    </DashboardWrapper>
  );
};

const Plan = ({
  isBest,
  startPaystack,
  planName,
  planCode,
  cost,
  benefits,
}) => {
  const [show, toggleShow] = useState(false);
  const handleClick = () => {
    toggleShow(!show);
  };
  const rev = benefits.reverse();
  return (
    <div className={`plan  ${isBest ? 'best' : ''}`}>
      {isBest ? (
        <div className="best-banner">
          <b> Best For You</b>
        </div>
      ) : (
        ''
      )}
      <h4>{planName}</h4>
      <h2>
        ₦{cost}
        <small>/monthly</small>
      </h2>

      <h6>Designed to give access to a good quality healthcare.</h6>
      <div
        className="benefits"
        style={{ height: `${show ? 'auto' : '206px'}` }}
      >
        
        {rev.map(({ title }) => (
          <div className="benefit">
            <CheckCircleFilled style={{ fontSize: '20px' }} /> <p>{title}</p>
          </div>
        ))}{' '}
      </div>

      <h6
        onClick={handleClick}
        style={{ cursor: 'pointer', marginTop: '10px' }}
      >
        Show {show ? 'less' : 'more'} ...
      </h6>

      <button
        className="btn primary btn-block"
        onClick={() => startPaystack(cost, planName)}
      >
        {isBest ? 'Proceed with Plan' : 'Select Plan'}
      </button>
    </div>
  );
};
export default SubscriptionPlansComponent;
