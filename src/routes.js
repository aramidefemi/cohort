import React from 'react';
import Login from './pages/Authentication/Login';
import LandingPage from './pages/LandingPage/';
import Evaluation from './pages/Authentication/Evaluation';
import SignUp from './pages/Authentication/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { OPEN_ASIDE, LOGIN } from './redux/application/action';
import './assets/css/styles.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} /> 
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/register" component={SignUp} /> 
          <Route exact path="/evaluate" component={Evaluation} /> 
        </Switch>
      </Router>
    );
  }
}

const ProtectedRoute = ({ path, component: Child }) => {
  let { user_token } = useSelector((state) => state.app);
  const token = user_token || window.localStorage.getItem('user_token') || null;
  console.log(
    'token hood',
    token,
    user_token || window.localStorage.getItem('user_token') || null
  );
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
export default App;
