import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './App.css';
import { Footer } from './Fit/Footer';
import { Navbar } from './Fit/Navbar';
import LoginWidget from './Auth/LoginWidget';
import {Dashboard} from './Fit/Dashboard';

// import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
// import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { StartPage } from './Fit/Start/StartPage';
import { Routine } from './Fit/Routine';
import { Account } from './Fit/Account';
import { Calendar } from './Fit/Calendar';
import { useAuth0 } from "@auth0/auth0-react";
import { Callback } from './Fit/callback';

// const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });


  // const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);
  // const [authRequiredModalOpen, setAuthRequiredModalOpen] = React.useState(false);
  
  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //   history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  // };

  
  const onAuthResume = async () => {
    history.push('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='d-flex flex-column min-vh-100'>
        <Navbar/>
        <div className='flex-grow-1'>
          <Switch>
            <Route path="/callback" component={Callback} />
            <Route path="/start" exact component={StartPage} />
            <Route path="/routine" exact component={Routine} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/account" exact component={Account} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="*" component={StartPage} />
          </Switch>
        </div>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;