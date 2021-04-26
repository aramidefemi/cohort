import React from 'react';
import Login from './pages/Authentication/Login';
import LandingPage from './pages/LandingPage/';
import Evaluation from './pages/Authentication/Evaluation';
import SignUp from './pages/Authentication/SignUp';
import Plans from './pages/Authentication/SubscriptionPlansComponent';
import SubscribersDashboard from './pages/Subscribers/';
import SubscriberHistory from './pages/Subscribers/History/';
import ProvidersDashboard from './pages/Providers/';
import SearchPatientRecord from './pages/Providers/SearchPatientRecord';
import PatientRecord from './pages/Providers/PatientRecord';
import HospitalHistory from './pages/Providers/History';
import SettingsComponent from './pages/Settings';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './assets/css/styles.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={LandingPage} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={SignUp} />
          <ProtectedRoute exact path="/subscribe" component={Plans} /> 
          <ProtectedRoute exact path="/evaluate" component={Evaluation} />
          <ProtectedRoute
            exact
            path="/provider"
            component={ProvidersDashboard}
          />
          <ProtectedRoute
            exact
            path="/patient-records"
            component={PatientRecord}
          />
          <ProtectedRoute
            exact
            path="/provider/history"
            component={HospitalHistory}
          />
          <ProtectedRoute
            exact
            path="/subscriber/history"
            component={SubscriberHistory}
          />
          <ProtectedRoute
            exact
            path="/subscriber"
            component={SubscribersDashboard}
          />
          <ProtectedRoute
            exact
            path="/search"
            component={SearchPatientRecord}
          />
          />
          <ProtectedRoute
            exact
            path="/settings"
            component={SettingsComponent}
          />
          <ProtectedRoute
            exact
            path="/search/:id"
            component={SearchPatientRecord}
          />
          <ProtectedRoute exact path="/history" component={HospitalHistory} />
        </Switch>
      </Router>
    );
  }
}

const ProtectedRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;

  if (utoken === null) {
    return <Redirect to={'/'} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
const AuthRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;
  const uuser = user || JSON.parse(window.localStorage.getItem('user')) || null; 

  if (utoken !== null) {
    let path;
    if (!uuser.hasSubscription) {
      path = '/subscribe';
    } else {
      path = {
        SUBSCRIBER: '/subscriber',
        PROVIDER: '/provider',
        ADMIN: '/provider',
      };
      path = path[uuser.userType]
    }
    return <Redirect to={path} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
export default App;
