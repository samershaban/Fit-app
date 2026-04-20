import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const domain = process.env.REACT_APP_OKTA_DOMAIN;
  const clientId = process.env.REACT_APP_OKTA_CLIENT_ID;
  const redirectUri = window.location.origin;

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // audience: {OKTA_AUDIENCE2},
        audience: process.env.REACT_APP_OKTA_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};