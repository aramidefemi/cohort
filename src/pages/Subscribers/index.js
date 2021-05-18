import React, { useEffect } from 'react';
import moment from 'moment';
import accounting from 'accounting';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import {
  List,
  Avatar,
  Tooltip,
  Card,
  Tabs,
  Input,
  Row,
  Col,
  Button,
  Divider,
} from 'antd';
import { UserOutlined, SearchOutlined, EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { usePaystackPayment } from 'react-paystack';
// images
import help from '../../assets/images/help.svg';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const SubscribersDashboard = () => {
  const {
    auth: { user },
    subscriber: { subscription },
  } = useSelector((state) => state);

  return (
    <DashboardWrapper type="subscriber">
      <div className="container">
        <Row>
          <Col className="gutter-row" span={12}>
            <Card className="subscriber-card">
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
          </Col>
          <Col className="gutter-row" span={12}>
            <Card className="benefits-card">
              <div className="balance">
                <div className="col">
                  <label>Total Medical Plan Cost</label>
                  <h4>
                    <strong>₦</strong>
                    {accounting.formatMoney(subscription.cost * 12, '')}
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
                  <label>Total Amount Paid</label>
                  <h4>
                    <strong>₦</strong>
                    {accounting.formatMoney(subscription.cost, '')}
                    <h5>/month</h5>
                  </h4> </div>
                
               
               
              </div>
              <p>
                    <Tooltip title="Make Payments">
                      <Button type="dashed" shape="circle" icon={'+'} />
                    </Tooltip> <br/>
                    Click here to make payments
                  </p>
              <p>
                Plan Name: <b>{subscription.planName}</b>
              </p>
              <p>
                Next payment due on{' '}
                <strong>
                  {moment(subscription.expiryDate).format('DD-MM-YYYY')}
                </strong>{' '}
                Months Covered <b>(12)</b>
              </p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={12}>
            <Card className="history-card">
              <div className="header">
                <h4>History</h4>
                <Link to="/subscriber/history">View All</Link>
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
                dataSource={[]}
                renderItem={(item) => (
                  <List.Item>
                    <div className="benefits">
                      <p>{item}</p>
                      <small>
                        02/28/2021
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
          </Col>
          <Col className="gutter-row" span={12}>
            <Card className="medical-benefits-usage-card">
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
                    renderItem={({ title, privileges, limited }) => {
                      if (!limited) {
                        return (
                          <List.Item>
                            <div className="benefits">
                              <p>{title}</p>
                              <small>♾️</small>
                            </div>
                          </List.Item>
                        );
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
                    renderItem={({ title, privileges, limited }) => {
                      if (limited) {
                        return (
                          <List.Item>
                            <div className="benefits">
                              <p>{title}</p>
                              <small>{privileges}</small>
                            </div>
                          </List.Item>
                        );
                      }
                    }}
                  />
                </TabPane>
                {/* <TabPane tab="Used-Up Benefits" key="3">
              Used-Up Benefits
            </TabPane> */}
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardWrapper>
  );
};

export default SubscribersDashboard;
