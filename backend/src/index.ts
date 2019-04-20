import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';

import path from 'path';

import { resolvers } from './graphql/resolvers';
import { ENGINE_API_KEY } from './config';
import { getKey, options } from './auth/JwtVerifier';

const typeDefs = importSchema(
  path.join(__dirname, '../src/graphql/schema.graphql'),
);
const PORT = process.env.PORT || 4000;

export interface IContext {
  user: string;
}

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
    console.log('AUTH header', authorization);
    if (!authorization) return {};
    const authHeader = authorization.replace('Bearer ', '');
    const user = await new Promise((resolve, reject) => {
      jwt.verify(authHeader, getKey, options, (err: any, decoded: any) => {
        if (err) reject(err);
        console.log('DECODED', decoded);
        if (!decoded) return {};
        resolve(decoded.sub);
      });
    });
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
  // tslint:disable-next-line
  console.log(
    `Now listening on port ${PORT}, at ${server.graphqlPath}, ${res.url}`,
  );
});
