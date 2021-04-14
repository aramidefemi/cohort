import axios from 'axios'; 
import { errorNotification, post, get } from '../store';

const api = (store) => (next) => async (action)  => {
  let response;
 
  switch (action.type) {
    default:
      return next(action);
  }
};

export default  api;