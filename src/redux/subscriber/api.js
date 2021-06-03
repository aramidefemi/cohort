
import {   post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'GET_SUBSCRIPTION': 
      response = await get('/subscriptions',token); 
      action.payload = response?.data; 
      
      return next(action);
    case 'ACTIVATE_PLAN': 
      response = await post('/activate-plan',action.payload,token); 
      action.type = 'GET_SUBSCRIPTION'; 
      action.payload = response?.data; 
      
      return next(action);
    case 'RECORD_PAYMENT': 
      response = await post('/record-payment',action.payload,token); 
      return next(action);
    case 'PAYMENT_RECORDS': 
      response = await get('/payment/records',action.payload,token); 
      return next(action);
    default:
      return next(action);
  }
};

export default api;
