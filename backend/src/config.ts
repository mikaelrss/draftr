import { config } from 'dotenv';
config();

export const {
  MLAB_USER,
  MLAB_URL,
  MLAB_PASSWORD,
  MONGO_URL,
  MONGO_USER,
  MONGO_PASSWORD,
  DB_NAME,
  BASE_URL,
  API_KEY,
  ENGINE_API_KEY,
  AUTH_AUDIENCE,
  AUTH_ISSUER,
  AUTH_ALGORITHM,
  AUTH_URL,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  PGPORT
} = process.env;

export const FORMAT = 'json';
export const PPR = 0;

export const DUMMY_USERNAME = 'mikaelrss';
