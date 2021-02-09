import axios from 'axios'; 

const api = (store) => (next) => async (action)  => {
  let response;
  async function post(url, body)  {
    try {
      const response = await axios.post(
        'http://3.138.202.26:3073/v1' + url,
        body
      ); 
      return { bool: true, data: response.data};
    } catch (error) {
      alert(error);
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