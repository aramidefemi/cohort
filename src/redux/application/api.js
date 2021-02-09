import axios from 'axios'; 
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
    default:
      return next(action);
  }
};

export default  api;