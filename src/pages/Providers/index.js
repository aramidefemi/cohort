import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { List, Avatar, Tooltip, Card, Tabs, Input } from 'antd';
import { UserOutlined, SearchOutlined, EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SubscribersDashboard = () => {
  const {
    auth: { user },
  } = useSelector((state) => state);
  const [searching, setSearching] = useState(false);

  if (searching) {
    return <Redirect to={'/search'} />;
  }

  return (
    <DashboardWrapper type="provider">
      <div className="searchbar">
        <Input
          onFocus={() => setSearching(true)}
          placeholder="Type policy number, card number or email to search subscribers"
          prefix={<SearchOutlined />}
        />
      </div>

      <div className="container">
        <Card style={{ width: '37%' }} className="subscriber-card">
          <h4>Provider Info</h4>
          <div className="row">
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fff',
              }}
              size={164}
              icon={<UserOutlined />}
            />
            <div className="ml col">
              <div className="name-group">
                <label>Provider</label>
                <p>{user['provider'] || ''}</p>
              </div>
              <div className="name-group">
                <label>Provider Reg Number</label>
                <p>{user['policyNumber']}</p>
              </div>
              <div className="name-group">
                <label>Phone Number</label>
                <p>{user['phone']}</p>
              </div>
              <div className="name-group">
                <label>Address</label>
                <p>{user['address'] || ''}</p>
              </div>
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
            <h5>Time Visited</h5>
            <h5></h5>
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
                  <button className="btn primary">Re-open</button>
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
