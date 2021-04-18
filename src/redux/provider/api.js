import axios from 'axios';
import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'FIND_USER': 
      response = await get('/find/user/'+action.payload,token); 
      action.payload = response?.data; 
      
      return next(action);
    default:
      return next(action);
  }
};

export default api;