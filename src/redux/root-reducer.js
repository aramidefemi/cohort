import { combineReducers } from 'redux';
import authReducer from './authentication/reducer'; 
import providerReducer from './provider/reducer';
import adminReducer from './admin/reducer';
import subscriberReducer from './subscriber/reducer';
import historyReducer from './history/reducer';
import settingsReducer from './settings/reducer';

export default combineReducers({ 
  auth: authReducer,
  provider: providerReducer,
  admin: adminReducer,
  subscriber: subscriberReducer,
  settings: settingsReducer,
  history: historyReducer
});