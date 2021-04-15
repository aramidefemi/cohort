import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { CheckCircleFilled, CaretDownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';

import {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
} from '../../common/plans';
import { usePaystackPayment } from 'react-paystack';
import { Link } from 'react-router-dom';

const SubscriptionPlansComponent = () => {
  const { auth: { user }, subscriber: { subscription } } = useSelector((state) => state);
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

  const startPaystack = (amount, plan) => {
    amount = amount * 100;
    const reference = new Date().getTime();
    const metadata = user;
    const email = user.email;

    setConfig({
      publicKey: 'pk_test_a1fcc1525836d8ca7c23abb658d0a99d3c3ce067',
      reference,
      metadata,
      amount,
      email,
      plan,
      init: true,
    });
  };

  useEffect(() => {
    if (config.init) {
      console.log('currentConfig', config);
      initializePayment(onSuccess, onClose);
    }
  });

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('reference', reference);
    setConfig({
      reference,
      init: false,
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
              Show More Plans <CaretDownOutlined style={{ color: '#ffffff' }} />
            </button>
          </div>

          {show ? (
            <section>
              <Plan {...four} startPaystack={startPaystack} />
              <Plan startPaystack={startPaystack} {...five} />
              <Plan startPaystack={startPaystack} {...six} />
              <Plan startPaystack={startPaystack} {...seven} />
              <Plan startPaystack={startPaystack} {...eight} />
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
      {benefits.map(({ title }) => (
        <div className="benefit">
          <CheckCircleFilled style={{ fontSize: '20px' }} /> <p>{title}</p>
        </div>
      ))}

      <button
        className="btn primary btn-block"
        onClick={() => startPaystack(cost, planCode)}
      >
        {isBest ? 'Proceed with Plan' : 'Select Plan'}
      </button>
    </div>
  );
};
export default SubscriptionPlansComponent;
