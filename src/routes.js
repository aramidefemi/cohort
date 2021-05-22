import React from 'react';
import Login from './pages/Authentication/Login';
import LandingPage from './pages/LandingPage/';
import Evaluation from './pages/Authentication/Evaluation/index';
import SignUp from './pages/Authentication/SignUp';
import Plans from './pages/Authentication/SubscriptionPlansComponent';
import SubscribersDashboard from './pages/Subscribers/';
import SubscriberHistory from './pages/Subscribers/History/';
import ProvidersDashboard from './pages/Providers/';
import SearchPatientRecord from './pages/Providers/SearchPatientRecord';
import PatientRecord from './pages/Providers/PatientRecord';
import HospitalHistory from './pages/Providers/History';
import SettingsComponent from './pages/Settings';
import AdminDashboard from './pages/Admin';
import AdminSubscribers from './pages/Admin/Subscribers';
import AdminSubscriber from './pages/Admin/Subscriber';
import AdminProvider from './pages/Admin/Provider';
import AdminProviders from './pages/Admin/Providers';
import GroupMembers from './pages/Subscribers/GroupMembers';
import SubscriberPayments from './pages/Subscribers/Payments';

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
          <AuthRoute exact path="/evaluation" component={Evaluation} />
          <ProviderProtectedRoute
            exact
            path="/provider"
            component={ProvidersDashboard}
          />
          <ProviderProtectedRoute
            exact
            path="/patient-records"
            component={PatientRecord}
          />
          <ProviderProtectedRoute
            exact
            path="/provider/history"
            component={HospitalHistory}
          />
          <SubscriberProtectedRoute
            exact
            path="/subscriber/history"
            component={SubscriberHistory}
          />
          <SubscriberProtectedRoute
            exact
            path="/subscriber"
            component={SubscribersDashboard}
          />
          <SubscriberProtectedRoute
            exact
            path="/group"
            component={GroupMembers}
          />
          <SubscriberProtectedRoute
            exact
            path="/payments"
            component={SubscriberPayments}
          />
          <ProviderProtectedRoute
            exact
            path="/search"
            component={SearchPatientRecord}
          />
          
          <ProtectedRoute
            exact
            path="/settings"
            component={SettingsComponent}
          />
          <AdminProtectedRoute
            exact
            path="/admin"
            component={AdminDashboard}
          />
          <AdminProtectedRoute
            exact
            path="/admin/subscribers"
            component={AdminSubscribers}
          />
          <AdminProtectedRoute
            exact
            path="/admin/subscriber/:id"
            component={AdminSubscriber}
          />
          <AdminProtectedRoute
            exact
            path="/admin/providers"
            component={AdminProviders}
          />
          <AdminProtectedRoute
            exact
            path="/admin/provider/:id"
            component={AdminProvider}
          />
          <ProviderProtectedRoute
            exact
            path="/search/:id"
            component={SearchPatientRecord}
          /> 
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
const ProviderProtectedRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;

  if (utoken === null) {
    return <Redirect to={'/'} />;
  }
  if (user.userType !== 'PROVIDER') {
    const path = {
      SUBSCRIBER: '/subscriber',
      PROVIDER: '/provider',
      ADMIN: '/admin',
    };

    const link = path[user.userType];
    return <Redirect to={link} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
const SubscriberProtectedRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;

  if (utoken === null) {
    return <Redirect to={'/'} />;
  }

  if (user.userType !== 'SUBSCRIBER') {
    const path = {
      SUBSCRIBER: '/subscriber',
      PROVIDER: '/provider',
      ADMIN: '/admin',
    };

    const link = path[user.userType];
    return <Redirect to={link} />;
  }

  return (
    <Route path={path}>
      <Child />
    </Route>
  );
};
const AdminProtectedRoute = ({ path, component: Child }) => {
  let { token, user } = useSelector((state) => state.auth);
  const utoken = token || window.localStorage.getItem('token') || null;

  if (utoken === null) {
    return <Redirect to={'/'} />;
  }

  if (user.userType !== 'ADMIN') {
    const path = {
      SUBSCRIBER: '/subscriber',
      PROVIDER: '/provider',
      ADMIN: '/admin',
    };

    const link = path[user.userType];
    return <Redirect to={link} />;
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
        ADMIN: '/admin',
      };
      path = path[uuser.userType];
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
