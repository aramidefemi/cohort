import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  console.log('action.type 2', action.type);
  switch (action.type) {
    case 'GET_BALANCE':
      console.log('action.type 1', action.type);
      response = await get('/wallet/balance', store.getState().app.token);
      return response.data;
    default:
      return next(action);
  }
};

export default api;
