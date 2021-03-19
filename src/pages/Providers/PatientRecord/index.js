import React, { useState } from 'react';
import { Input, Skeleton, Avatar, Table } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

const PatientRecord = ({ toggleRecords }) => {
  const [loading, setLoading] = useState(true);
  const toggleLoading = () => setLoading(!loading);
  return (
    <div className="PatientRecord area">
      <div className="record">
        <div className="body">
          <div className="details">
            <div className="subscriber">
              <Avatar
                style={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
                size={164}
                icon={<UserOutlined />}
              />
              <div className="name-group">
                <label>Full name</label>
                <p>Deji Adeniran</p>
              </div>
              <div className="name-group">
                <label>Card Number</label>
                <p>028-3824</p>
              </div>
              <div className="row">
                <div className="name-group">
                  <label>Phone number</label>
                  <p>080123456789</p>
                </div>
                <div className="name-group">
                  <label>Email Address</label>
                  <p>dejiadeniran@email.com</p>
                </div>
              </div>
              <div className="row">
                <div className="name-group">
                  <label>Policy number</label>
                  <p>028-3824</p>
                </div>
                <div className="name-group">
                  <label>Company Logo</label>
                  <p>028-3824</p>
                </div>
              </div>
              <br />
              <button
                onClick={() => toggleRecords('DashboardStats')}
                className="btn primary btn-block"
              >
                Close Patient Record
              </button>
            </div>

            <div className="actions">
              <h4>Medical Benfits for this Patient</h4>
              <Input
                autoFocus
                placeholder="Type policy number, card number or email to search subscribers"
                prefix={<SearchOutlined />}
              />
              <br/>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  
 

export default PatientRecord;
