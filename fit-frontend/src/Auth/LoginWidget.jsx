import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import logo from '../logo.svg';

import config from './config';

const LoginWidget = ({ setCorsErrorModalOpen }) => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();

  // Fetch otp and state from query params from email callback verification URI
  // Application should have http://localhost:8080/login as the email callback verification URI
  const queryParams = new URLSearchParams(window.location.search);
  const otp = queryParams.get('otp');
  const state = queryParams.get('state');

  useEffect(() => {
    if (!widgetRef.current) {
      return false;
    }

    const { issuer, clientId, redirectUri, scopes, useInteractionCode } = config.oidc;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo,
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Fit App',
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer,
        scopes,
      },
      useInteractionCodeFlow: useInteractionCode, // Set to true, if your org is OIE enabled
      state,
      otp,
      idps: [
        { type: 'GOOGLE', id: '0oad2vp1z19N8mpKo5d7', issuerMode: 'ORG_URL' }
      ],
      // helpLinks: {
      //   help: 'https://acme.com/help',
      //   forgotPassword: 'https://acme.com/forgot-password',
      //   unlock: 'https://acme.com/unlock-account',
      //   custom: [
      //     {
      //       text: 'What is Okta?',
      //       href: 'https://acme.com/what-is-okta'
      //     },
      //     {
      //       text: 'Acme Portal',
      //       href: 'https://acme.com',
      //       target: '_blank'
      //     }
      //   ]
      // },
      // customButtons: [{
      //   title: 'Sign Up',
      //   className: 'btn',
      //   click: () => {
      //     // clicking on the button navigates to another page
      //     window.location.href = '/sign-up/';
      //   }
      // }],
      // // An example that adds a registration link underneath the login form on the primary auth page
      // registration: {
      //   click: () => {
      //     window.location.href = 'https://acme.com/sign-up';
      //   }
      // },
    });

    widget.renderEl(
      { el: widgetRef.current },
      (res) => {
        oktaAuth.handleLoginRedirect(res.tokens);
      },
      (err) => {
        throw err;
      },
    );

    // Note: Can't distinguish CORS error from other network errors
    const isCorsError = (err) => (err.name === 'AuthApiError' && !err.statusCode);

    widget.on('afterError', (_context, error) => {
      if (isCorsError(error)) {
        setCorsErrorModalOpen(true);
      }
    });

    return () => widget.remove();
  }, [oktaAuth]);

  return (
    <div>
      <div ref={widgetRef} />
    </div>
  );
};

export default LoginWidget;
