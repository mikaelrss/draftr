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
    domain: 'draftr.eu.auth0.com',
    clientID: 'QuCAaoAt3NBXInVnjUGvALyzHggEoxUm',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile',
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
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken = () => this.accessToken;

  getIdToken = () => this.idToken;

  // prettier-ignore
  setSession = (authResult: any) => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    console.log(authResult);

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

    // navigate to the home route
    history.replace('/home');
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        );
      }
    });
  }

  // prettier-ignore
  login = () => {
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
    history.replace('/home');
  }

  isAuthenticated = () => new Date().getTime() < this.expiresAt;
}
