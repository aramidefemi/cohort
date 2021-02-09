import { get, post } from '../../http';

const api = (store) => (next) => async (action) => {
  let response;
  console.log('action.type 2',action.type)
  switch (action.type) {
    case 'GET_BALANCE':
      console.log('action.type 1',action.type)
      response = await get('/wallet/balance', store.getState().app.user_token);
      return response.data;
    default:
      return next(action);
  }
};

export default api;
