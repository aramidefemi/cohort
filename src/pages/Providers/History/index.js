import React from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    ah: '10 Downing Street',
    h: '10 Downing Street',
    policyNumber: 32,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Subscriber',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <>
        <h6>Anika Ekstrom Bothman</h6>
        <p>028-3824 | alma.lawson@example.com</p>
      </>
    ),
  },
  {
    title: 'Date Visited',
    dataIndex: 'age',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'ah',
    key: 'time',
  },
  {
    title: 'Benefits Used',
    dataIndex: 'h',
    key: 'benefits',
    render: (text, record) =>
      ['Complement C3', 'Troponin-I Test'].map((i) => <p>{i}</p>),
  },
  {
    title: '',
    dataIndex: 'policyNumber',
    key: 'address',
    render: (text, record) => (
      <Link to={`/search/${text.policyNumber}`} className="btn primary">
        Re-open
      </Link>
    ),
  },
];

const HospitalHistory = () => {
  const handleForm = () => {};
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
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default HospitalHistory;
