import { combineReducers } from 'redux';
import authReducer from './authentication/reducer'; 
import applicationReducer from './application/reducer';
import paymentsReducer from './payments/reducer';

export default combineReducers({ 
  auth: authReducer,
  app: applicationReducer,
  payments: paymentsReducer
});