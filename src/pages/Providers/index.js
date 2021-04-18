import React, { useEffect } from 'react';
import moment from 'moment';
import accounting from 'accounting';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { List, Avatar, Tooltip, Card, Tabs, Input } from 'antd';
import { UserOutlined, SearchOutlined, EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

// images
import help from '../../assets/images/help.svg';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const datah = [];
const SubscribersDashboard = () => {
  const {
    auth: { user },
    subscriber: { subscription },
  } = useSelector((state) => state);

  console.log('subscription', subscription);

  return (
    <DashboardWrapper type="subscriber">
      <div className="container">
        <Card style={{ width: '37%' }} className="subscriber-card">
          <h4>Your E-Card</h4>
          <div className="row">
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
              size={164}
              icon={<UserOutlined />}
            />
            <div className="ml col">
              <div className="name-group">
                <label>Full name</label>
                <p>{user['fullname']}</p>
              </div>
              <div className="name-group">
                <label>Policy Number</label>
                <p>{user['policyNumber']}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="name-group">
              <label>Phone number</label>
              <p>{user['phone']}</p>
            </div>
          </div>
          <div className="row">
            <div className="name-group">
              <label>Email Address</label>
              <p>{user['email']}</p>
            </div>
          </div>
        </Card>

        <Card style={{ width: '57%' }} className="history-card">
          <div className="header">
            <h4>History</h4>
            <Link to="history">View All</Link>
          </div>
          <div className="header">
            <h5>Subscriber</h5>
            <h5 
            >
              Time Visited
            </h5>
            <h5 
            >
             
            </h5>
          </div>

          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={[{}]}
            renderItem={(item) => (
              <List.Item>
                <div className="benefits">
                  <p>Ashlynn Levin</p>
                  <small>A Minute Ago</small>
                  <button className="btn primary" >Re-open</button>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
