import axios from 'axios';
import { post, get, put, postWithoutUrl } from '../store';
import { message } from 'antd';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
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
    
    await put('/profile',action.payload,token);
    window.localStorage.setItem('user', JSON.stringify(action.payload));
    return next(action);
    case 'CHANGE_PASSWORD':  
    response= await put('/change-password',action.payload,token); 
    if (response.success) { 
      message.success('Password changed successfully!');
    }
    return next(action);
    case 'SUBMIT_FOR_COMPUTATION':  
    
    response = await postWithoutUrl('https://fathomless-falls-56866.herokuapp.com/predict', action.payload,{
      crossDomain: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    if(response.success) {
      console.log('response',response)
      action.payload = response.data;
    }
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
