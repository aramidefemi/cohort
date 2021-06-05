import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Row,
  Col,
  InputNumber,
  Input,
  Form,
  Modal,
  Statistic,
  Button,
  Space,
} from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const columns = [
  {
    title: 'Subscriber',
    dataIndex: 'fullname',
    key: 'subscriber',
    render: (text, record) => (
      <>
        <h6>{record.fullname}</h6>
        <p>
          {record.policyNumber} | {record.email}
        </p>
      </>
    ),
  },
  {
    title: 'Contact Details',
    dataIndex: 'email',
    key: 'email',
    render: (text, record) => (
      <>
        <h6>{record.phone}</h6>
        <p>{record.address}</p>
      </>
    ),
  },
  {
    title: 'Date Registered',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text, record) => moment(text).format('lll'),
  },
  {
    title: 'Action',
    dataIndex: 'hasSubscription',
    key: 9,
    fixed: 'right',
    width: 100,
    render: (text) => !text ? <Button type="link" info>Active Account</Button> : <Button type="link" info>Top Up Wallet</Button>,
  },
];

const SubscriberPayments = () => {
  const {
    subscriber: { group },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  console.log('group', group);

  useEffect(() => {
    dispatch({
      type: 'GET_GROUP_MEMBERS',
    });
  }, []);
  const handleReload = () => {
    dispatch({
      type: 'GET_GROUP_MEMBERS',
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
          <h4>Members </h4>
          <Space style={{ margin: '16px 0', float: 'right' }}>
            <Button onClick={showModal}>Add Member</Button>
            <Button>Add Members</Button>
          </Space>

          <Table
            columns={columns}
            dataSource={group}
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

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
const AddSubscriberModal = ({ isModalVisible, setIsModalVisible }) => {
  const dispatch = useDispatch();
 
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log('values',values);
    dispatch({
      type: 'ADD_GROUP_MEMBER',
      payload: values
    });
    dispatch({
      type: 'GET_GROUP_MEMBERS',
    });
    handleCancel()
  };
  return (
    <>
      <Modal
        title="Add User"
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['user', 'fullname']}
            label="Enter fullname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Enter Email Address"
            rules={[{ type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'phone']}
            label="Enter Phone number" 
          >
            <Input />
          </Form.Item>
        
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button className='btn primary' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SubscriberPayments;
