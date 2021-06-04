import React, { useState } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Input,Button } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const columns = [
  {
    title: 'Provider',
    dataIndex: 'provider',
    key: 'Provider',
    render: (text, record) => (
      <>
        <h6>{text.provider || text.fullname}</h6>
        <p>{text.policyNumber} | {text.email}</p>
      </>
    ),
  },
  {
    title: 'Date Visited',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, record) => moment(text).format('ll')
  },
  {
    title: 'Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, record) => moment(text).format('LT')
  },

  {
    title: 'Benefits Used',
    dataIndex: 'benefits',
    key: 'benefits',
    render: (text, record) => text.map(({ title }) => <p>- {title}</p>),
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    fixed: 'right',
    width: 100,
    render: () =><Button type="link" href={'mailTo:admin@hadiel.com.ng'} danger>Report</Button>,
  },
];

const SubscriberHistory = () => {
  const {
    auth: { user },
    history: { history },
  } = useSelector((state) => state);
  const [ search, setSearch ] = useState('');
  const dispatch = useDispatch();
  console.log('history',history);
  const handleReload = () => {
    dispatch({
      type: 'FETCH_HISTORY',
      payload: {
        search
      }
    });
  };
  const handleForm = ({ target: { value }}) =>{
    setSearch(value);
    handleReload()
  } 
  return (
    <DashboardWrapper type="subscriber">
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
          <Table dataSource={history} onChange={(e)=>console.log('e',e)} columns={columns} />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SubscriberHistory;
