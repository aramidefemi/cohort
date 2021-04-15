import React, { useEffect } from 'react';
import moment from 'moment';
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
  const { auth: { user }, subscriber: { subscription } } = useSelector((state) => state);


  console.log('subscription',subscription);

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

        <Card style={{ width: '57%' }} className="benefits-card">
          <div className="balance">
            <div className="col">
              <label>Medical benefits allowance balance</label>
              <h4>
                <strong>₦</strong> 200,000<small>.00</small>
              </h4>
            </div>
            <Tooltip
              placement="bottomRight"
              title="Medical benefits allowance balance is Eu vitae, sit pellentesque arcu. Tempus volutpat malesuada mattis integer eget augue. Congue."
            >
              <img src={help} className="help" alt="" />
            </Tooltip>
          </div>
          <div className="plan">
            <div className="col">
              <label>Subscription Plan</label>
              <h4>
                <strong>₦</strong> {subscription.cost}<small>.00</small> <h5>/month</h5>
              </h4>
            </div>
            <Tooltip
              placement="bottomRight"
              title="Medical benefits allowance balance is Eu vitae, sit pellentesque arcu. Tempus volutpat malesuada mattis integer eget augue. Congue."
            >
              <img src={help} className="help" alt="" />
            </Tooltip>
          </div>

          <p>
            Next payment on <strong>{moment(subscription.expiryDate).format("DD-MM-YYYY")}</strong>
          </p>
        </Card>
        <Card style={{ width: '37%' }} className="history-card">
          <div className="header">
            <h4>History</h4>
            <Link to="history">View All</Link>
          </div>
          <div className="header">
            <h5>Provider</h5>
            <h5
              style={{
                marginRight: '34px',
              }}
            >
              Date Visited
            </h5>
          </div>

          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={datah}
            renderItem={(item) => (
              <List.Item>
                <div className="benefits">
                  <p>{item}</p>
                  <small>
                    02/28/2021{' '}
                    <Link to="history">
                      <EyeFilled
                        style={{
                          marginLeft: '20px',
                          cursor: 'pointer',
                          color: '#2E7B8C',
                        }}
                      />
                    </Link>
                  </small>
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Card style={{ width: '57%' }} className="medical-benefits-usage-card">
          <h4>Other Medical Benfits</h4>
          <Tabs defaultActiveKey="1" className="tabs" onChange={callback}>
            <TabPane tab="Unlimited Benefits" key="1">
              <div className="searchbar">
                <Input
                  autoFocus
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                />
              </div>
              <div className="header">
                <h5>Benefit</h5>
                <h5>Nō of times left to use</h5>
              </div>
              <List
                size="small"
                header={null}
                footer={null}
                bordered
                dataSource={subscription?.benefits || []}
                renderItem={({title, privileges, limited}) => {
                  if (!limited) {
                    return  <List.Item>
                    <div className="benefits">
                      <p>{title}</p>
                      <small>{privileges}</small>
                    </div>
                  </List.Item>
                  }
                }}
              />
            </TabPane>
            <TabPane tab="Limited Benefits" key="2">
            <div className="searchbar">
                <Input
                  autoFocus
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                />
              </div>
              <div className="header">
                <h5>Benefit</h5>
                <h5>Nō of times left to use</h5>
              </div>
              <List
                size="small"
                header={null}
                footer={null}
                bordered
                dataSource={subscription?.benefits || []}
                renderItem={({title, privileges, limited}) => {
                  if (limited) {
                    return  <List.Item>
                    <div className="benefits">
                      <p>{title}</p>
                      <small>{privileges}</small>
                    </div>
                  </List.Item>
                  }
                }}
              />
            </TabPane>
            {/* <TabPane tab="Used-Up Benefits" key="3">
              Used-Up Benefits
            </TabPane> */}
          </Tabs>
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
