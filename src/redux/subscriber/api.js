
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
      response = await get('/activate-plan',token); 
      action.type = 'GET_SUBSCRIPTION'; 
      action.payload = response?.data; 
      
      return next(action);
    default:
      return next(action);
  }
};

export default api;
