import React from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
// import { Link } from 'react-router-dom';
import { Card, Table } from 'antd'; 

 
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];


const HospitalHistory = () => {
  return (
    <DashboardWrapper type="subscriber">
      <div className="container">
        <Card style={{ width: '100%' }} className="HospitalHistory-card">
          <h4>All History</h4>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default HospitalHistory;
