import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useHistory } from "react-router-dom";

export const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();

  const domain = "dev-4yozs5k5nw3lrgnm.us.auth0.com"
  const clientId = "5Bt3sNwAr3VRm3bpudICDXnexrJ3bIUl"
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
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};