import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const PORT = process.env.PORT || 3009;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: PORT }).then(res => {
  // tslint:disable-next-line
  console.log(`Now listening on port ${PORT}`);
});
