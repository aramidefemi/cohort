import React from 'react'; 
import { Link } from 'react-router-dom';
import { Card } from 'antd'; 
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// images
import go from '../../../assets/images/go.svg';
const DashboardStats = ({toggleRecords}) => {
  return (
    <>
      <div className="searchbar">
        <Input
          onClick={toggleRecords}
          placeholder="Type policy number, card number or email to search subscribers"
          prefix={<SearchOutlined />}
        />
         <img src={go} className="go" alt="" />
      </div>
      <div className="container">
        <Card style={{ width: '47%' }}>
          <h4>Provider Info</h4>
        </Card>
        <Card style={{ width: '47%' }}>
          <h4>Recent Patients</h4>
        </Card>
        <Card style={{ width: '47%' }}>
          <h4>History</h4>
        </Card>
        <Card style={{ width: '47%' }}>
          <h4>Medical benefits balance</h4>
        </Card>
      </div>
    </>
  );
};

export default DashboardStats;
