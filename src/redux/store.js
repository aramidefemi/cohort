import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { logger } from './middleware';
import auth from './authentication/api';
import app from './application/api';
import messages from './messages/api';
import requests from './requests/api';
import products from './products/api';
import payments from './payments/api';
import { notification } from 'antd';

export const errorNotification = (error) => {
  notification.open({ 
    description:
      error,
    className: 'custom-notification-class',
    style: {
      width: 600,
    },
  });
};

const initialstate = {};
const middleware = [thunk, logger, auth,app,messages,requests,products,payments];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

export const store = createStore(
  rootReducer,
  initialstate,
  compose(applyMiddleware(...middleware), devTools)
);
