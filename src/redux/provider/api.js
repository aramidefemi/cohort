import { post, get } from '../store';
import { message } from 'antd';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'FIND_USER':
      response = await get('/find/user/' + action.payload, token);
      if (response.success) {
        action.payload = response?.data;
        action.payload.found = true;
      } else {
        message.error('Subscriber not found!');
      }
      return next(action);
    case 'SEND_OTP':
      response = await get('/otp/send/' + action.payload, token);
      message.success('OTP SENT');
      return next(action);
    case 'VERIFY_OTP':
      response = await post(
        '/otp/verify/' + action.payload.id,
        action.payload,
        token
      );

      if (response?.data?.verified) {
        message.success('OTP Verification Successful!');
        action.payload = response?.data;
      } else {
        message.error('Incorrect OTP');
      }

      return next(action);
    case 'REOPEN':
      response = await get(
        '/reopen/' + action.payload.id,
        token
      );
      if (response.success) {
        action.payload = { ...action.payload, ...response?.data};
        action.type = 'VERIFY_OTP';
      }
 
      return next(action);
    case 'SAVE_RECORDS':
      await post('/save/records/' + action.payload.id, action.payload, token);

      action.payload = {
        user: {},
        subscription: {},
        found: false,
        verified: false,
      };
      return next(action);
    default:
      return next(action);
  }
};

export default api;
