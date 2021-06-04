import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Row,
  Col,
  Button,
  Modal,
  Statistic,
  Space,
} from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import accounting from 'accounting';

const columns = [
  {
    title: 'Payee',
    dataIndex: 'subscriber',
    key: 4,
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
    title: 'Amount Paid',
    dataIndex: 'amount',
    key: 1,
    render: (text) => accounting.formatMoney(text, 'N'),
  },
  {
    title: 'Plan Name',
    dataIndex: 'planName',
    key: 2,
  },
  {
    title: 'Trn. Reference',
    dataIndex: 'reference',
    key: 3,
  },

  {
    title: 'Date Registered',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, record) => moment(text).format('lll'),
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    fixed: 'right',
    width: 100,
    render: () =><Button type="link" href={'mailTo:admin@hadiel.com.ng'} danger>Dispute</Button>,
  },
];

const GroupMembers = () => {
  const {
    subscriber: { payment_history },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'PAYMENT_RECORDS',
    });
  }, []);

  const handleReload = () => {
    dispatch({
      type: 'PAYMENT_RECORDS',
      payload: {
        search,
      },
    });
  };
  const handleForm = ({ target: { value } }) => {
    setSearch(value);
    handleReload();
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <DashboardWrapper type="admin">
      <div className="container">
        <Card style={{ width: '100%' }} className="HospitalHistory">
          <h4>Payments History </h4>

          <Table
            columns={columns} 
            dataSource={payment_history}
          />
        </Card>
      </div>
      <AddSubscriberModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </DashboardWrapper>
  );
};

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandabcle',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
const AddSubscriberModal = ({ isModalVisible, setIsModalVisible }) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default GroupMembers;
