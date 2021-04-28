import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Space, Button, Alert, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

// images
import logo from '../assets/images/logo.svg';
import avatar from '../assets/images/avatar.svg';

// //  menu images
import calendar from '../assets/images/calendar.svg';
import dashboard from '../assets/images/dashboard.svg';
import setting from '../assets/images/setting.svg';
import thumbnail from '../assets/images/thumbnail.svg';

const DashboardWrapper = ({ type, children }) => {
  const location = useLocation();
  
  const {
    auth: { user },
    subscriber: { subscription },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_HISTORY',
    });
    if (type === 'subscriber') {
      dispatch({
        type: 'GET_SUBSCRIPTION',
      });
    }
  }, []);

  const handleClick = (e) => {
    console.log('click ', e);
  };
  const menus = {
    SUBSCRIBER: subscriber,
    PROVIDER: provider,
    ADMIN: admin,
  };

  const menu = menus[user.userType]; 
  return (
    <div className={'DashboardWrapper ' + type}>
      <div className="sidebar">
        <div className="logo">
          <img src={logo} className="logo" alt="" />
        </div>
        <div className="title">
          <h5>MAIN MENU</h5>
        </div>

        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
        >
          {(menu || []).map(({ icon, title, link }) => (
            <Menu.Item key={link}>
              <Link to={link} className="menu-item">
                <img src={icon} alt="" />
                <p>{title}</p>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      <div className="main">
        <div className="header">
          <div className="profile">
          <Avatar
                 
                className="avatar"
                icon={<UserOutlined />}
                src={user.profile_url || ''}
              />
 
            <div className="details">
              <p>{user['fullname']}</p>
              <small>{user['email']}</small>
            </div>
          </div>
        </div>
        {typeof subscription?.active !== 'undefined' ? (
          <> </>
        ) : type == 'subscribe' ? (
          <> </>
        ) : (
          <Alert
            message="Dear user please select a subscription plan, to get the best out of hadiel"
            type="warning"
            action={
              <Space>
                <Link to="subscribe" size="small" type="ghost">
                  Click here!
                </Link>
              </Space>
            }
            closable
          />
        )}
        <div className="container-main">{children}</div>
      </div>
    </div>
  );
};
const subscriber = [
  {
    title: 'Dashboard',
    icon: dashboard,
    link: '/subscriber',
  },
  {
    title: 'History',
    icon: calendar,
    link: '/subscriber/history',
  },
  {
    title: 'Settings',
    icon: setting,
    link: '/settings',
  },
];
const admin = [
  {
    title: 'Dashboard',
    icon: dashboard,
    link: '/subscriber',
  },
  {
    title: 'History',
    icon: calendar,
    link: '/history',
  },
  {
    title: 'Settings',
    icon: setting,
    link: '/subscriber',
  },
];

const provider = [
  {
    title: 'Dashboard',
    icon: dashboard,
    link: '/provider',
  },
  {
    title: 'Search',
    icon: thumbnail,
    link: '/search',
  },
  {
    title: 'History',
    icon: calendar,
    link: '/provider/history',
  },
  {
    title: 'Settings',
    icon: setting,
    link: '/settings',
  },
];

export default DashboardWrapper;
