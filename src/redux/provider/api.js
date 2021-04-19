import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action) => {
  let response;
  const token = store.getState()?.auth?.token;
  switch (action.type) {
    case 'FIND_USER':
      response = await get('/find/user/' + action.payload, token);
      action.payload = response?.data;
      return next(action);
    case 'SEND_OTP':
      response = await get('/otp/send/' + action.payload.id, token);
      errorNotification('OTP SENT');
      return next(action);
    case 'VERIFY_OTP':
      response = await post(
        '/otp/verify/' + action.payload.id,
        action.payload,
        token
      );
      if (response?.data?.verified) {
        action.payload = response?.data.user;
      } else {
        errorNotification('Incorrect OTP');
      }

      return next(action);
    default:
      return next(action);
  }
};

export default api;
