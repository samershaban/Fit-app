import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { Footer } from './Fit/Footer';
import { Navbar } from './Fit/Navbar';
import LoginWidget from './Auth/LoginWidget';
import {Dashboard} from './Fit/Dashboard';

import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Homepage } from './Fit/Homepage';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {

  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);
  const [authRequiredModalOpen, setAuthRequiredModalOpen] = React.useState(false);
  
  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  
  const onAuthResume = async () => {
    history.push('/login');
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}>
        <Navbar/>
        <div className='flex-grow-1'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='home'/>
            </Route>
            <Route path='/home'>
              <Homepage/>
            </Route>
            <Route path='/dashboard'>
              <Dashboard/>
            </Route>
            {/* <SecureRoute path='/home'> <HomePage/> </SecureRoute> */}
            <Route path="/login/callback" render={(props) => <LoginCallback {...props} onAuthResume={onAuthResume} />} />
            <Route path="/login" render={() => <LoginWidget {...{ setCorsErrorModalOpen }} />} />
          </Switch>
        </div>
        <Footer/>
      </Security>
    </div>
  );
}

export default App;