import axios from 'axios';
import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  switch (action.type) {
    case 'SIGN_UP':
      const user = store.getState().auth.form;
      user.userType = 'SUBSCRIBER';
      response = await post('/signup', { user }); 

      if (response.success) {
        window.localStorage.setItem('token', response.data['token']);
        window.localStorage.setItem(
          'user',
          JSON.stringify(response.data['user'])
        );

        action.type = 'LOGIN';
        action.payload = {
          user: response.data['user'],
          token: response.data['token'],
        };
      }

      return next(action);

    case 'SIGN_IN': 
      response = await post('/login', {  ...store.getState().auth.form }); 

      if (response.success) {
        window.localStorage.setItem('token', response.data['token']);
        window.localStorage.setItem(
          'user',
          JSON.stringify(response.data['user'])
        );

        action.type = 'LOGIN';
        action.payload = {
          user: response.data['user'],
          token: response.data['token'],
        };
      }

    return next(action);
    default:
      return next(action);
  }
};

export default api;
