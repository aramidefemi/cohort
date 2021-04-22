import React, { useState } from 'react';
import { Input, Avatar, List, Popover, InputNumber } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import accounting from 'accounting';

const PatientRecord = ({ toggleRecords }) => {
  const {
    provider: { verified, user, subscription },
  } = useSelector((state) => state);
  const stockBenefits = subscription.benefits;
  const [benefits, setBenefits] = useState(stockBenefits || []);
  const [history, setHistory] = useState([]);
  const [privilege, setPrivileges] = useState(1);

  const handleForm = ({ target: { value } }) => {
    const sort = benefits.filter((item) => item.title.search(value));
    setBenefits(sort);
  };

  console.log('history', history);
  console.log('benefits', benefits);
  const dispatch = useDispatch();

  const handleBenefitsUse = (value) => {
    console.log('value', value);
    const mybenefits = benefits;
    const fooBenefits = mybenefits.map((item) => {
      if (item.title === value.title) {
        return value;
      } else {
        return item;
      }
    });
    const fooHistory = history;
    fooHistory.push(value);
    setBenefits(fooBenefits);
    setHistory(fooHistory);
  };

  const handleBenefitsUndoUse = (value) => {
    console.log('value', value);
    const mybenefits = benefits;
    const fooHistory = history;

    const fooBenefits = mybenefits.map((item) => {
      if (item.title === value) {
        return value;
      } else {
        return item;
      }
    });

    const fooHistoryRedo = fooHistory.filter(
      (item) => item.title !== value.title
    );

    setBenefits(fooBenefits);
    setHistory(fooHistoryRedo);
  };

  const saveRecords = () => {
    dispatch({
      type: 'SAVE_RECORDS',
      payload: {
        id: user._id,
        benefits,
        history: {
          benefits: history,
        },
      },
    });
  };

  if (!verified) {
    return <Redirect to={'/provider'} />;
  }

  return (
    <div className="PatientRecordDetails">
      <div className="record">
        <div className="subscriber-img">
          <Avatar
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
            size={164}
            icon={<UserOutlined />}
          />
        </div>
        <div className="details">
          <div className="row">
            <div className="name-group">
              <label>Full name</label>
              <p>{user.fullname}</p>
            </div>
            <div className="name-group">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="row">
            <div className="name-group">
              <label>Policy number</label>
              <p>{user.policyNumber}</p>
            </div>
            <div className="name-group">
              <label>Phone number</label>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <button onClick={saveRecords} className="btn primary btn-block">
            Save {'&'} Exit Patient Record
          </button>
        </div>
      </div>

      <div className="body">
        <div className="row">
          <h5>Free Benefits</h5>
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={benefits || []}
            renderItem={(item) => {
              const { title, privileges, used, limited } = item;
              const handle = () => {
                item.used = true;
                handleBenefitsUse(item);
              };
              if (!limited) {
                if (!used) {
                  return (
                    <List.Item>
                      <div className="benefits">
                        <p>{title}</p>

                        <button
                          onClick={handle}
                          className="btn primary bg-black"
                        >
                          Use
                        </button>
                      </div>
                    </List.Item>
                  );
                }
              }
            }}
          />
        </div>
        <div className="row">
          <h5>Limited Benefits</h5>
          <div className="searchbar">
            <Input
              autoFocus
              onChange={handleForm}
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </div>
          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={benefits || []}
            renderItem={(item) => {
              const { title, used, privileges, limited } = item;
              const isMoney = privileges > 999;
              const handle = () => {
                const consumed = isMoney ? privilege : 1;
                const used = privileges - consumed;
                item.privileges = used;
                item.used = true;
                item.consumed = consumed;
                item.isMoney = isMoney;
                console.log('used', used, privileges, privilege);
                handleBenefitsUse(item);
              };
              if (limited) {
                if (!used) {
                  const lim = isMoney
                    ? accounting.formatMoney(privileges, 'N')
                    : privileges;
                  return (
                    <List.Item>
                      <div className="benefits">
                        <p>
                          {title} <small>({lim})</small>{' '}
                        </p>
                        {isMoney ? (
                          <Popover
                            content={
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                <InputNumber
                                  min={1}
                                  max={privileges}
                                  defaultValue={1}
                                  onChange={(value) => setPrivileges(value)}
                                  className="form-group"
                                />
                              </div>
                            }
                            title={`Customer Cash limit is ${lim}`}
                          >
                            <button onClick={handle} className="btn primary">
                              Use
                            </button>
                          </Popover>
                        ) : privileges >= 1 ? (
                          <button
                            onClick={handle}
                            className="btn primary"
                            type="button"
                          >
                            Use
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </List.Item>
                  );
                }
              }
            }}
          />
        </div>
        <div className="row bg-black">
          <h5>
            Benefits used in the session
            <small>
              Count: <b>{history.length}</b>
            </small>
          </h5>

          <List
            size="small"
            header={null}
            footer={null}
            bordered
            dataSource={history || []}
            renderItem={(item) => {
              const { title, used, privileges, consumed, limited } = item;
              const isMoney = privileges > 999;
              const handle = () => {
                const consumed = isMoney ? privilege : 1;
                const used = privileges + consumed;
                item.privileges = used;
                item.consumed = 0;
                item.used = false;
                handleBenefitsUndoUse(item);
              };
              return (
                <List.Item>
                  <div className="benefits">
                    <p>
                      {title}{' '}
                      {isMoney ? (
                        <small>({accounting.formatMoney(consumed, 'N')})</small>
                      ) : (
                        ''
                      )}
                    </p>
                    <button
                      onClick={handle}
                      className={`btn primary ${
                        item.limited ? '' : 'bg-black'
                      }`}
                    >
                      Remove
                    </button>
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
