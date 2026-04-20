import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";
import './index.css';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <StrictMode>
      <BrowserRouter>
        <Auth0ProviderWithHistory
          domain={process.env.REACT_APP_OKTA_DOMAIN}
          clientId={process.env.REACT_APP_OKTA_CLIENT_ID}
          authorizationParams={{ redirect_uri: window.location.origin }}
        >
          <App />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </StrictMode>
  
);
