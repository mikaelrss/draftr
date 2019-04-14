import { config } from 'dotenv';
config();

export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const BASE_URL = process.env.BASE_URL;
export const API_KEY = process.env.API_KEY;
export const FORMAT = 'json';
export const PPR = 0;

export const DUMMY_USERNAME = 'mikaelrss';

export const ENGINE_API_KEY = process.env.ENGINE_API_KEY;
