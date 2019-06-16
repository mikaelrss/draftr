import auth0 from 'auth0-js';
import { history } from '../components/root/Root';

export interface IIdTokenPayload {
  at_hash: string;
  aud: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  locale: string;
  name: string;
  nickname: string;
  nonce: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export default class Auth {
  auth0 = new auth0.WebAuth({
    // @ts-ignore
    audience: process.env.REACT_APP_AUDIENCE,
    // @ts-ignore
    domain: process.env.REACT_APP_DOMAIN,
    // @ts-ignore
    clientID: process.env.REACT_APP_CLIENT_ID,
    // @ts-ignore
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    // @ts-ignore
    responseType: process.env.REACT_APP_RESPONSE_TYPE,
    // @ts-ignore
    scope: process.env.REACT_APP_SCOPE,
  });

  accessToken: string | null;
  idToken: string | null;
  idTokenPayload: IIdTokenPayload | null;
  expiresAt: number;

  constructor() {
    const idTokenPayload = localStorage.getItem('idTokenPayload');
    const expires = localStorage.getItem('expiresAt');
    this.accessToken = localStorage.getItem('accessToken');
    this.idToken = localStorage.getItem('idToken');
    this.expiresAt = expires != null ? +expires : 0;
    this.idTokenPayload =
      idTokenPayload != null ? JSON.parse(idTokenPayload) : null;
  }

  // prettier-ignore
  handleAuthentication = () => {
    // @ts-ignore
    window.ga('send', 'handleAuthentication');
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        window.location.reload(true);
        history.replace('/');
      } else if (err) {
        history.replace('/');
      }
    });
  }

  // prettier-ignore
  getAccessToken = () =>
    this.accessToken || localStorage.getItem('accessToken')

  getIdToken = () => this.idToken;

  // prettier-ignore
  setSession = (authResult: any) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    const idTokenPayload: IIdTokenPayload = authResult.idTokenPayload;
    this.idTokenPayload = idTokenPayload;

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('idTokenPayload', JSON.stringify(idTokenPayload));

  }

  renewSession() {
    this.auth0.checkSession({}, (err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
      }
    });
  }

  // prettier-ignore
  login = () => {
    // @ts-ignore
    window.ga('send', 'login attempt');
    this.auth0.authorize();
  }

  // prettier-ignore
  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenPayload');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');

    this.auth0.logout({
      returnTo: window.location.origin,
      // return_to: window.location.origin,
    });

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated = () => new Date().getTime() < this.expiresAt;
}
