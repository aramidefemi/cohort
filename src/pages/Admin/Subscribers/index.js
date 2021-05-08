import React, { useState,useEffect } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Row, Col, Input,Modal, Statistic, Button, Space } from 'antd';
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
        <p>
          {record.address}
        </p>
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
    title: 'Has Active Subscription',
    dataIndex: 'hasSubscription',
    key: 'benefits',
    render: (text, record) => `${text}`,
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

const AdminSubscribers = () => {
  const {
    admin: { subscribers }
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch({
        type: 'GET_SUBSCRIBERS',
      });
  }, []);
  console.log('subscribers',subscribers)
  const handleReload = () => {
    dispatch({
      type: 'GET_SUBSCRIBERS',
      payload: {
        search,
      },
    });
  };
  const handleTablePaginationChanges = (e) => {
    console.log('e',e)
  }
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
          <h4>Subscribers </h4>
          <Space style={{ margin: '16px 0', float: 'right' }}>
            <Button onClick={showModal}>Add Subscriber</Button>
            <Button>Add Bulk</Button>
          </Space>

          <Table
            columns={columns}
            expandRowByClick
            expandable={{
              expandedRowRender: (record) => (
                <div className="expandedTable">
                  <Row>
                    <Col span={6}>
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
                  <Row>
                    <Col span={12}>
                      <Statistic title="Subscription" value={record.subscription}  />
                    </Col>
                    <Col span={6} push={2}>
                      <Statistic
                        title="Total Payments"
                        value={record.totalPayments / 100}
                        
                      />
                    </Col>
                  </Row>
                  <br />
                  <br />
                
                  <Row>
                    <Col span={3} >
                      <Link to={'/admin/subscriber/:id'}>View More</Link>
                    </Col>
                  </Row>
                </div>
              ),
              expandIcon: ({ expanded, onExpand, record }) =>
                expanded ? '-' : '+', 
            }}
            onChange={handleTablePaginationChanges}
            dataSource={subscribers}
          />
        </Card>
      </div>
      <AddSubscriberModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> 
    </DashboardWrapper>
  );
};

const AddSubscriberModal = ({isModalVisible,setIsModalVisible}) => {

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <> 
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default AdminSubscribers;
