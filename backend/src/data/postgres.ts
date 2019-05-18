import { Client } from 'pg';
import { PGUSER, PGPASSWORD, PGDATABASE, PGHOST } from '../config';

export const initPostgresConnection = async () => {
  const client = new Client({
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: 5432,
    host: PGHOST,
    ssl: process.env.NODE_ENV === "production",
  });
  await client.connect();
  return client;
};
