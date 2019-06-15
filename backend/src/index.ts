import { ApolloServer, ForbiddenError } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';

import path from 'path';

import { resolvers } from './graphql/resolvers';
import { ENGINE_API_KEY } from './config';
import { getKey, options } from './auth/JwtVerifier';
import { initPostgresConnection } from './data/postgres';

const typeDefs = importSchema(
  path.join(__dirname, '../src/graphql/schema.graphql'),
);
const PORT = process.env.PORT || 4000;

export interface Context {
  user: string;
}
export let dbClient: Client;
const init = async () => {
  dbClient = await initPostgresConnection();
  const server = new ApolloServer({
    // @ts-ignore
    typeDefs,
    resolvers,
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
    introspection: true,
    playground: true,
    context: async context => {
      const authorization = context.req.headers.authorization;
      if (!authorization) return {};
      const authHeader = authorization.replace('Bearer ', '');
      let user: string;
      try {
        user = await new Promise((resolve, reject) => {
          jwt.verify(authHeader, getKey, options, (err: any, decoded: any) => {
            if (err) reject(err);
            if (!decoded) return {};
            resolve(decoded.sub);
          });
        });
      } catch (e) {
        throw new ForbiddenError('Logged out');
      }
      return {
        user,
      };
    },
    engine: {
      apiKey: ENGINE_API_KEY,
    },
  });

  server.setGraphQLPath('/graphql');

  server.listen({ port: PORT }).then((res: any) => {
    // eslint-disable-next-line
    console.log(
      `Now listening on port ${PORT}, at ${server.graphqlPath}, ${res.url}`,
    );
  });
};
init();
