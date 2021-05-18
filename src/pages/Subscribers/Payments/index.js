import React, { useState, useEffect } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Row,
  Col,
  Input,
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
  // {
  //   title: 'Action',
  //   dataIndex: '',
  //   key: 'x',
  //   fixed: 'right',
  //   width: 100,
  //   render: () => <a>Suspend</a>,
  // },
];

const GroupMembers = () => {
  const {
    admin: { providers },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  console.log('providers', providers);

  useEffect(() => {
    dispatch({
      type: 'GET_PROVIDERS',
    });
  }, []); 
  const handleReload = () => {
    dispatch({
      type: 'GET_PROVIDERS',
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
            expandRowByClick
            expandable={{
              expandedRowRender: (record) => (
                <div className="expandedTable">
                  <Row>
                    <Col span={12}>
                      <Statistic
                        title="Total Hospital Sessions"
                        value={record.visits}
                        
                      />
                    </Col>
                    <Col span={6} push={2}>
                      <Statistic
                        title="Last Hospital Session"
                        value={moment(record.lastVisit).format('lll')}
                        
                      />
                    </Col>
                  </Row>
                  <br />

                  <br />

                  <Row>
                    <Col span={3}>
                      <Link to={'/admin/provider/:id'}>View More</Link>
                    </Col>
                  </Row>
                </div>
              ),
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? '-' : '+', 
            }}
            dataSource={providers}
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
