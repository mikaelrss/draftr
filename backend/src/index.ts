import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import path from 'path';

import { resolvers } from './graphql/resolvers';

const typeDefs = importSchema(path.join(__dirname, './graphql/schema.graphql'));
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
server.setGraphQLPath('/graphql');

server.listen({ port: PORT }).then(res => {
  // tslint:disable-next-line
  console.log(
    `Now listening on port ${PORT}, at ${server.graphqlPath}, ${res.url}`,
  );
});
