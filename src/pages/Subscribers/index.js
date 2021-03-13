import React from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const SubscribersDashboard = () => {
  return (
    <DashboardWrapper type="subscriber">
      <div className="container">
        <Card style={{ width: '37%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: '57%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: '37%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card style={{ width: '57%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
