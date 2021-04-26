import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Input,Tabs } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const SettingsComponent = () => {
  const {
    auth: { user },
    history: { history },
  } = useSelector((state) => state);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const handleReload = () => {
    dispatch({
      type: 'FETCH_HISTORY',
      payload: {
        search,
      },
    });
  };
 
  return (
    <DashboardWrapper type="provider">
      <div className="container">
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </DashboardWrapper>
  );
};

export default SettingsComponent;
