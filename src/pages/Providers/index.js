import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { List, Avatar, Tooltip, Card, Button, Tabs, Input } from 'antd';
import { UserOutlined, SearchOutlined, EyeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const SubscribersDashboard = () => {
  const {
    auth: { user },
    history: { history },
    provider: { verified },
  } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const dispatch = useDispatch();
  const handleReopen = (id, history) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
    dispatch({
      type: 'REOPEN',
      payload: {
        id,
        benefits: history.benefits,
        history: history.id
      },
    });
  };
  if (searching) {
    return <Redirect to={'/search'} />;
  }
  if (verified) {
    return <Redirect to={'/patient-records'} />;
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
            <Link to="/provider/history">View All</Link>
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
            loading={!history}
            dataSource={history || []}
            renderItem={({
              benefits,
              _id,
              subscriber: {
                id,
                fullname,
                policyNumber,
                authorization: {
                  isAuthorized,
                  authorizedProvider,
                  authorizedTill,
                },
              },
              createdAt,
            }) => (
              <List.Item>
                <div className="benefits">
                  <p>{fullname}</p>
                  <small>{moment(createdAt).format('llll')}</small>
                  {isAuthorized &&
                  authorizedProvider === user.id &&
                  moment(authorizedTill).isAfter(moment().format()) ? (
                    <Button
                      loading={loading}
                      onClick={() => handleReopen(id,{id: _id, benefits})}
                      className="btn primary"
                    >
                      Re-open
                    </Button>
                  ) : (
                    <p></p>
                  )}
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
