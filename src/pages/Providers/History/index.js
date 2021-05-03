import React, { useState } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link, Redirect } from 'react-router-dom';
import { Card, Table, Input, Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const HospitalHistory = () => {
  const {
    auth: { user },
    history: { history },
    provider: { verified },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleReload = () => {
    dispatch({
      type: 'FETCH_HISTORY',
      payload: {
        search,
      },
    });
  };

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
  const handleForm = ({ target: { value } }) => {
    setSearch(value);
    handleReload();
  };
  const columns = [
    {
      title: 'Subscriber',
      dataIndex: 'subscriber',
      key: 'subscriber',
      render: (text, record) => (
        <>
          <h6>{text.fullname}</h6>
          <p>
            {text.policyNumber} | {text.email}
          </p>
        </>
      ),
    },
    {
      title: 'Date Visited',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => moment(text).format('ll'),
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => moment(text).format('LT'),
    },
    {
      title: 'Benefits Used',
      dataIndex: 'benefits',
      key: 'benefits',
      render: (text, record) => text.map(({ title }) => <p>- {title}</p>),
    },
    {
      title: '',
      dataIndex: 'subscriber',
      key: 'subscriber',
      render: (text, record) => {
        const {
          authorization: { isAuthorized, authorizedProvider, authorizedTill },
           
        } = text;
        return isAuthorized &&
          authorizedProvider === user.id &&
          moment(authorizedTill).isAfter(moment().format()) ? (
          <Button
            loading={loading}
            onClick={() => handleReopen(text.id, record)}
            className="btn primary"
          >
            Re-open
          </Button>
        ) : (
          ''
        );
      },
    },
  ];

  if (verified) {
    return <Redirect to={'/patient-records'} />;
  }
  return (
    <DashboardWrapper type="provider">
      <div className="container">
        <Card style={{ width: '100%' }} className="HospitalHistory">
          <h4>All History</h4>
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Search list"
              prefix={<SearchOutlined />}
            />
          </div>
          <Table
            dataSource={history}
            onChange={(e) => console.log('e', e)}
            columns={columns}
          />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default HospitalHistory;
