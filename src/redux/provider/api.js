import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'FIND_USER':
      response = await get('/find/user/' + action.payload, token);
      action.payload = response?.data;
      action.payload.found = true;
      console.log('payload',action)
      return next(action);
    case 'SEND_OTP':
      response = await get('/otp/send/' + action.payload, token);
      errorNotification('OTP SENT');
      return next(action);
    case 'VERIFY_OTP':
      response = await post(
        '/otp/verify/' + action.payload.id,
        action.payload,
        token
      );
      console.log('response?.data',response?.data)

      if (response?.data?.verified) {
        errorNotification('OTP Verification Successful!');
        action.payload = response?.data;
      } else {
        errorNotification('Incorrect OTP');
      }

      return next(action);
    case 'SAVE_RECORDS':
      response = await post(
        '/save/records' + action.payload.id,
        action.payload,
        token
      ); 
      action.payload = {
        user: {},
        subscription: {},
        found: false,
        verified: false
      }
      return next(action);
    default:
      return next(action);
  }
};

export default api;
