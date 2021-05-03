import {  post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  
  switch (action.type) {
    case 'GET_BALANCE':
    
      response = await get('/wallet/balance', store.getState().app.token);
      return response.data;
    default:
      return next(action);
  }
};

export default api;
