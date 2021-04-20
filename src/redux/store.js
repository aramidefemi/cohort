import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import auth from './authentication/api';
import provider from './provider/api';
import subscriber from './subscriber/api';
import admin from './admin/api';
import axios from 'axios';
import { notification } from 'antd';

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export const errorNotification = (error) => {
  notification.open({
    description: error,
    className: 'custom-notification-class',
    style: {
      width: 600,
    },
  });
};
const local = 'https://my-cohort-api.herokuapp.com';


export const post = async (url, body, token) => {
  try {
    const response = await axios.post(local + url, body, {
      headers: {
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(error); 
    errorNotification(error.response.data.error);
    
    return { success: false };
  }
};

export const get = async (url, token = null) => {
  try {
    const response = await axios.get(local + url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    errorNotification(error.response.data.error);
    console.error(error);
    return { success: false };
  }
};



const initialstate = {};

const middleware = [thunk, logger, auth, admin, provider, subscriber];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

export const store = createStore(
  rootReducer,
  initialstate,
  compose(applyMiddleware(...middleware), devTools)
);
