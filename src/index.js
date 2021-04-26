
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; 
import Route from './routes';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import axios from 'axios';
import { store } from "./redux/store";
import { Provider } from 'react-redux'; 
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Route />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
