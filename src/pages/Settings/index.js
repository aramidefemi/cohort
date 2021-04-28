import React, { useState } from 'react';
import DashboardWrapper from '../../components/DashboardWrapper';
import { Link } from 'react-router-dom';
import { Card, Table, Input, Tabs } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import PersonalInfoSettingsComponent from './tabs/personal-info';
import AccountSettingsComponent from './tabs/account-info';

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
        <Card style={{ width: '100%' }} className="HospitalHistory setting-page">
          <h4>Settings</h4>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Personal Info" key="1">
              <PersonalInfoSettingsComponent />
            </TabPane>
            <TabPane tab={`Password ${'&'} Security`} key="3">
              <AccountSettingsComponent />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </DashboardWrapper>
  );
};

export default SettingsComponent;
