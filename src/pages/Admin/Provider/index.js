import React, { useState } from 'react';
import DashboardWrapper from '../../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Row,
  Col,
  Input,
  Collapse,
  Statistic,
  Button,
  Modal,
  Space,
} from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const { Panel } = Collapse;
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

const AdminProvider = () => {
 
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
  


  return (
    <DashboardWrapper type="admin">
      <div className="container">
        <Card style={{ width: '100%' }} className="HospitalHistory">
          <h4>Subscriber - <small>John Doe</small> </h4>
          <Row>
            <Col span={12}>
              <Statistic
                title="Total Hospital Sessions"
                value={112893}
                loading
              />
            </Col>
            <Col span={6} push={2}>
              <Statistic title="Last Hospital Session" value={112893} loading />
            </Col>
          </Row>
          
          <br />
          <br />

           <h4>Hospital Sessions</h4>
              <Table columns={columns} dataSource={data} />
       
        </Card>
      </div>
      
    </DashboardWrapper>
  );
};

function callback(key) {
  console.log(key);
}

 
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
];

 



export default AdminProvider;
