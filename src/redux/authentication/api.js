import axios from 'axios';
import { LOGIN } from '../application/action';
import { SEND_OTP } from './actions';
import { errorNotification } from '../store';

const api = (store) => (next) => async (action)  => {
  let response;
  async function post(url, body)  {
    try {
      const response = await axios.post(
        'https://collegeportalapi.herokuapp.com' + url,
        body
      ); 
      return { bool: true, data: response.data};
    } catch (error) {
      errorNotification(error);
      console.error(error);
      return { bool: false }
    }
  }
  switch (action.type) {
    case 'SIGN_UP':
      response = post('/api/v1/tokens', { user: store.getState().auth.form});  
      window.localStorage.setItem('user_token', response.data['user_token']);
      return next(LOGIN(response.data));
    case 'SEND_OTP':
      // return post('/auth/user/email', store.getState().auth.form, LOGIN);

      return next(LOGIN(action.payload))
    case 'SIGN_IN':
      response = await post('/api/v1/tokens', { user: store.getState().auth.form }); 

      if(typeof response.data.errors === 'undefined' && typeof response.data !== 'undefined') { 
        window.localStorage.setItem('user_token', response.data['token']); 
       
        action.payload = {
          user_token: response.data['token'],
          user: response.data,
        } 
        console.log(action,response.data['token'])
        return next(action) 
      }else {
        errorNotification(response.data.errors || 'Wrong user type');
      }
    return
    case 'LOGIN':
      console.log('LOGIN',action.payload['user_token'])
      return next(action);
    default:
      return next(action);
  }
};

export default  api;