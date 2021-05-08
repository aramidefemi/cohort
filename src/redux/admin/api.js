import { post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'GET_STATS':
      response = await get('/admin/statistics', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { statistics: response.data };
      return next(action);

    case 'GET_PROVIDERS':
      response = await get('/admin/all/providers', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { providers: response.data };
      return next(action);

    case 'GET_SUBSCRIBERS':
      response = await get('/admin/all/subscribers', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { subscribers: response.data };
      return next(action);

    case 'GET_PROVIDER':
      response = await get('/admin/statistics', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { provider: response.data };
      return next(action);

    case 'GET_SUBSCRIBER':
      response = await get('/admin/statistics', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { subscriber: response.data };
      return next(action);

    case 'GET_HISTORY':
      response = await get('/admin/history/:id/:userType', token);
      action.type = 'UPDATE_ADMIN_STATE';
      action.payload = { history: response.data };
      return next(action);

    default:
      return next(action);
  }
};

export default api;
