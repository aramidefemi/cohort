import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu, Space, Button, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// images
import logo from '../assets/images/logo.svg';
import avatar from '../assets/images/avatar.svg';

// //  menu images
import calendar from '../assets/images/calendar.svg';
import dashboard from '../assets/images/dashboard.svg';
import setting from '../assets/images/setting.svg';
import thumbnail from '../assets/images/thumbnail.svg';

const DashboardWrapper = ({ type, children }) => {
  const { auth: { user }, subscriber: { subscription } } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_SUBSCRIPTION',
    });
  }, []); 

  const handleClick = (e) => {
    console.log('click ', e);
  };
  const menus = type == 'provider' ? provider : subscriber;

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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {menus.map(({ icon, title, link }, i) => (
            <Menu.Item key={i + 1}>
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
            <img src={user['profile_url']} className="avatar" alt="" />
            <div className="details">
              <p>{user['fullname']}</p>
              <small>{user['email']}</small>
            </div>
          </div>
        </div>
        { typeof subscription?.active !== 'undefined' ? (
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
    title: 'Your Patients',
    icon: thumbnail,
    link: '/provider',
  },
  {
    title: 'History',
    icon: calendar,
    link: '/provider',
  },
  {
    title: 'Settings',
    icon: setting,
    link: '/provider',
  },
];

export default DashboardWrapper;
