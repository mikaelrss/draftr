import jwksClient from 'jwks-rsa';
import {
  AUTH_AUDIENCE,
  AUTH_ISSUER,
  AUTH_ALGORITHM,
  AUTH_URL,
} from '../config';

export const client = jwksClient({
  jwksUri: AUTH_URL,
});

export const getKey = (header: any, cb: any) => {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};

export const options = {
  audience: AUTH_AUDIENCE,
  issuer: AUTH_ISSUER,
  algorithms: [AUTH_ALGORITHM],
};
