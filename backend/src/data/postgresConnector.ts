import Sequelize from 'sequelize';
import { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } from '../config';

// @ts-ignore
export const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  dialect: 'postgres',
  host: PGHOST,
  port: PGPORT,
  define: {
    createdAt: 'createdat',
    updatedAt: 'updatedat',
  },
  dialectOptions: {
    ssl: true,
  },
});
