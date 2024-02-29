import logo from '../logo.svg'

export const oktaConfig = {
  idps: [
    { type: 'GOOGLE', id: '0oad2vp1z19N8mpKo5d7', issuerMode: 'ORG_URL' }
  ],
  // idpDisplay: "SECONDARY",
  clientId: '0oacty3k2bgYfGnLO5d7',
  issuer: 'https://dev-96235492.okta.com/oauth2/default',
  // redirectUri: 'https://fit-app-63f583016776.herokuapp.com/login/callback',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: true,
  features: {
    showPasswordToggleOnSignInPage: true,
    // registration: true,
  },
  logo: logo,
  i18n: {
    en: {
      'primaryauth.title': 'Sign in to Fit App',
    },
  },
  // registration: {
    // click: () => {
    //   window.location.href = 'https://dev-96235492.okta.com/idp/idx/enroll';
    // }
  // },
}