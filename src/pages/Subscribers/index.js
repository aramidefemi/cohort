import React, { useEffect, useState } from 'react';
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
  InputNumber,
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
    subscriber: { subscription, plan },
  } = useSelector((state) => state);
  const [config, setConfig] = useState({ init: false });
  const [topUpAmount, setTopUpAmount] = useState(0);
  const dispatch = useDispatch();

  const initializePayment = usePaystackPayment(config);

  const handleValueChange = (multiple) => {
    const amount = plan.subscriptionPayments * multiple * 100;
    setTopUpAmount(amount);
  };

  const startPaystack = () => {
    const reference =
      new Date().getTime() +
      '' +
      Math.floor(Math.random() * 100000000).toString();
    const metadata = user;
    const email = user.email;

    setConfig({
      publicKey: 'pk_test_a1fcc1525836d8ca7c23abb658d0a99d3c3ce067',
      reference,
      metadata,
      planName: subscription.planName,
      email,
      amount: topUpAmount,
      init: true,
    });
  };

  useEffect(() => {
    if (config.init) {
      initializePayment(onSuccess, onClose);
    }
  }, [config.init]);

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('reference from onSuccess', reference);
    setConfig({
      reference,
      init: false,
    });
    dispatch({
      type: 'RECORD_PAYMENT',
      payload: {
        user: user._id,
        plan,
        durationPaidFor: topUpAmount / plan.subscriptionPayments,
        payment: reference,
      },
    });
  };

  // you can call this function anything
  const onClose = (e) => {
    setConfig({
      ...config,
      init: false,
    });
  };

  return (
    <DashboardWrapper type="subscriber">
      <div className="container">
        <Row>
          <Col className="gutter-row" md={24} lg={12}>
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
          <Col className="gutter-row" md={24} lg={12}>
            <Card className="benefits-card">
              <div className="balance">
                <div className="col">
                  <label>Subscription Plan</label>
                  <b>{plan?.planName}</b>
                  <h4>
                    <strong>₦</strong>
                    {accounting.formatMoney(plan?.subscriptionPayments, '')}
                    <h5>/month</h5>
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
                  <label>Total Medical Plan Cost</label>
                  <h4>
                    <strong>₦</strong>
                    {accounting.formatMoney(plan?.cost, '')}
                  </h4>
                </div>
              </div>
              <p>
                Benefits last until 
                <b> {moment(subscription?.expiryDate).format('DD-MM-YYYY')}
                </b>
              </p>
              <div className="dashboard-payment-area">
                <div className="form-group">
                 
                  <InputNumber
                    min={1}
                    max={12}
                    defaultValue={1}
                    onChange={handleValueChange}
                  />

                  <Tooltip title="Make Payments">
                    <Button onClick={startPaystack}  className='btn primary'>
                      Add Money
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" md={24} lg={12}>
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
          <Col className="gutter-row" md={24} lg={12}>
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
