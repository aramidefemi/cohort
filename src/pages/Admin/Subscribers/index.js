import React, { useState } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Row, Col, Input,Modal, Statistic, Button, Space } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
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
    auth: { user },
    history: { history },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  console.log('history', history);
  const handleReload = () => {
    dispatch({
      type: 'FETCH_HISTORY',
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
                    <Col span={12}>
                      <Statistic
                        title="Total Hospital Sessions"
                        value={112893}
                        loading
                      />
                    </Col>
                    <Col span={6} push={2}>
                      <Statistic
                        title="Last Hospital Session"
                        value={112893}
                        loading
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col span={6}>
                      <Statistic title="Subscription" value={112893} loading />
                    </Col>
                    <Col span={12} push={2}>
                      <Statistic
                        title="Total Payments"
                        value={112893}
                        loading
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
              rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={data}
          />
        </Card>
      </div>
      <AddSubscriberModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> 
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
