import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import path from 'path';

import { resolvers } from './graphql/resolvers';

const typeDefs = importSchema(path.join(__dirname, '../src/graphql/schema.graphql'));
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  // @ts-ignore
  typeDefs,
  resolvers,
  introspection: true,
});
server.setGraphQLPath('/graphql');

server.listen({ port: PORT }).then((res: any) => {
  // tslint:disable-next-line
  console.log(
    `Now listening on port ${PORT}, at ${server.graphqlPath}, ${res.url}`,
  );
});
