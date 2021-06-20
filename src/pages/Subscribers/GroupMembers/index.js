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
import { usePaystackPayment } from 'react-paystack';
import moment from 'moment';

const SubscriberPayments = () => {
  const {
    subscriber: { group },
    auth: { user },
    subscriber: { subscription, plan },
  } = useSelector((state) => state);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  console.log('group', group);

  useEffect(() => {
    dispatch({
      type: 'GET_GROUP_MEMBERS',
    });
  }, []);
  const initializePayment = usePaystackPayment({
    publicKey: 'pk_test_a1fcc1525836d8ca7c23abb658d0a99d3c3ce067',
    reference:
      new Date().getTime() +
      '' +
      Math.floor(Math.random() * 100000000).toString(),
    metadata: user,
    planName: plan?.planName,
    email: user?.email,
    amount: plan?.subscriptionAmount * 100,
  });
  const handleReload = () => {
    dispatch({
      type: 'GET_GROUP_MEMBERS',
    });
  };
  const handleForm = ({ target: { value } }) => {
    setSearch(value);
    handleReload();
  };
  const activateAccount = (user,reference) => {
    dispatch({
      type: 'ACTIVATE_PLAN',
      payload: {
        payment: reference,
        user,
        planName: plan.planName,
      },
    });
    setTimeout(handleReload, 2000);
  };
  const recordPayments = (user,reference) => {
    dispatch({
      type: 'RECORD_PAYMENT',
      payload: {
        user: user._id, 
        durationPaidFor: 1,
        payment: reference,
      },
    });
    setTimeout(handleReload, 500);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onClose = (e) => {
    console.log(e);
  };

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
      title: 'Subscription Amount',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => plan?.subscriptionAmount,
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
      render: (text,record) =>
        !text ? (
          <Button
            onClick={() => initializePayment((ref)=>activateAccount(record,ref), onClose)}
            type="link"
            info
          >
            Activate Plan
          </Button>
        ) : (
          <Button
          onClick={() => initializePayment((ref)=>recordPayments(record,ref), onClose)}
           type="link" info>
            Top Up Wallet
          </Button>
        ),
    },
  ];

  return (
    <DashboardWrapper type="admin">
      <div className="container">
        <Card style={{ width: '100%' }} className="HospitalHistory">
          <h4>Members </h4>
          <Space style={{ margin: '16px 0', float: 'right' }}>
            <Button onClick={showModal}>Add Member</Button>
          </Space>

          <Table columns={columns} dataSource={group} />
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
    console.log('values', values);
    dispatch({
      type: 'ADD_GROUP_MEMBER',
      payload: values,
    });
    dispatch({
      type: 'GET_GROUP_MEMBERS',
    });
    handleCancel();
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
          <Form.Item name={['user', 'phone']} label="Enter Phone number">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button className="btn primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SubscriberPayments;
