import { post, get } from '../store';
import { message } from 'antd';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'GET_SUBSCRIPTION':
      response = await get('/subscriptions', token);
      console.log('response',response)
      action.type = 'UPDATE_SUBSCRIBER_STATE';
      action.payload = response?.data;

      return next(action);
    case 'ACTIVATE_PLAN':
      response = await post('/activate-plan', action.payload, token);
      action.type = 'UPDATE_SUBSCRIBER_STATE';
      action.payload = response?.data;

      return next(action);
    case 'RECORD_PAYMENT':
      response = await post('/record-payment', action.payload, token);
      if (response.success) message.success('Wallet Top Up Successful');
      action.type = 'UPDATE_SUBSCRIBER_STATE';
      action.payload = response?.data;
      return next(action);
    case 'PAYMENT_RECORDS':
      response = await get('/payment/records', token);
      action.type = 'UPDATE_SUBSCRIBER_STATE';
      action.payload = response?.data;
      return next(action);
    case 'GET_GROUP_MEMBERS':
      response = await get('/group/members', token);
      action.type = 'UPDATE_SUBSCRIBER_STATE';
      action.payload = response?.data; 
      return next(action);
    case 'ADD_GROUP_MEMBER':
      response = await post('/new/group/member', action.payload, token);
      if (response.success) message.success('Successful!');
      return next(action);
    default:
      return next(action);
  }
};

export default api;
