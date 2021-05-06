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
    auth: { user },
    subscriber: { subscription },
  } = useSelector((state) => state);

  return (
    <DashboardWrapper type="admin">
      <div className="container">
        <div className="stats">
          <Row>
            <Col span={6}>
              <Statistic title="Total Subscribers" value={112893} loading />
              <Link to='/admin/subscribers'>View</Link>
            </Col>
            <Col span={12} push={2}>
              <Statistic title="Active Subscribers" value={112893} loading />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Subscriber - Provider Sessions"
                value={112893}
                loading
              />
              <Link>View</Link>
            </Col>
            <Col push={2} span={6}>
              <Statistic title="Total Providers" value={112893} loading />
              <Link>View</Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={6}>
              <Statistic title="Subscriptions" value={112893} loading />
            </Col>
            <Col span={12} push={2}>
              <Statistic title="Active Subscriptions" value={112893} loading />
              <Link>View</Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Subscriber Payments"
                value={112893}
                loading
              />
              <Link>View</Link>
            </Col>
          </Row>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
