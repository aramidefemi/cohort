import axios from 'axios';

const post = async (url, body, token) => {
  try {
    const response = await axios.post(
      'https://collegeportalapi.herokuapp.com' + url,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + token, //the token is a variable which holds the token
        },
      }
    );
    return { bool: true, data: response.data };
  } catch (error) {
    alert(error);
    console.error(error);
    return { bool: false };
  }
};
const get = async (url, token = null) => {
  try {
    const response = await axios.get('https://collegeportalapi.herokuapp.com' + url, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token, //the token is a variable which holds the token
      },
    });
    return { bool: true, data: response.data };
  } catch (error) {
    alert(error);
    console.error(error);
    return { bool: false };
  }
};

export { post, get };
