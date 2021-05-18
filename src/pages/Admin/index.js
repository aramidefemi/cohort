import React, { useEffect } from 'react';
import moment from 'moment';
import accounting from 'accounting';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Row, Col, Statistic, Button } from 'antd';
import { UserOutlined, SearchOutlined, EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// images
import help from '../../assets/images/help.svg';

const SubscribersDashboard = () => {
  const {
    admin: { statistics },
  } = useSelector((state) => state); 

  const {
    activeSubscribers,
    payments,
    providers,
    sessions,
    subscribers,
    subscription,
    totalPayments,
  } = statistics || {};

  return (
    <DashboardWrapper type="admin">
      <div className="container">
        <div className="stats">
          <Row>
            <Col span={6}>
              <Statistic
                title="Total Subscribers"
                value={subscribers}
                loading={!statistics}
              />
              <Link to="/admin/subscribers">View</Link>
            </Col>
            <Col span={12} push={2}>
              <Statistic
                title="Subscribers With Active Subscriptions"
                value={activeSubscribers}
                loading={!statistics}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col push={3} span={12}>
              <Statistic
                title="Total Hospital Sessions"
                value={sessions}
                loading={!statistics}
              />
              <Link>View</Link>
            </Col>
            <Col push={2} span={6}>
              <Statistic
                title="Total Providers"
                value={providers}
                loading={!statistics}
              />
              <Link>View</Link>
            </Col>
          </Row>
          <br />
          <Row> 
            <Col span={12}>
              <Statistic
                title="Active Subscriptions"
                value={subscription}
                loading={!statistics}
              /> 
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>
              <Statistic
                title="Total Subscriber Payments"
                value={payments}
                loading={!statistics}
              /> 
            </Col>
            <Col span={12} push={2}>
              <Statistic
                title="Total Subscriber Payments Amount"
                value={totalPayments}
                loading={!statistics}
              /> 
            </Col>
          </Row>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
