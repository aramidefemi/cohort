import axios from 'axios';
import { post, get, put } from '../store';

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
    case 'SAVE_USER': 
    const token = store.getState()?.auth?.token;
    await put('/profile',action.payload,token);
    window.localStorage.setItem('user', JSON.stringify(action.payload));
    return next(action);
    case 'LOGOUT':
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('user',null);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');

    action.type = 'LOGIN';
    action.payload = { user: null, token: null };
    return next(action);
    default:
      return next(action);
  }
};

export default api;
