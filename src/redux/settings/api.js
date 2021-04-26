import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'FETCH_HISTORY': 
      response = await get('/fetch/history',token);
      action.payload = response?.data; 
      return next(action);
    default:
      return next(action);
  }
};

export default api;
