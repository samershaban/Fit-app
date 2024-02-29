/*
 * Copyright (c) 2018-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const CLIENT_ID = '0oacty3k2bgYfGnLO5d7';
const ISSUER = 'https://dev-96235492.okta.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || true;
const BASENAME = '/';
// BASENAME includes trailing slash
const REDIRECT_URI = `${window.location.origin}${BASENAME}login/callback`;
const USE_INTERACTION_CODE = true;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    useInteractionCode: USE_INTERACTION_CODE,
    // features: {registration: true}
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
  app: {
    basename: BASENAME,
  },
};
