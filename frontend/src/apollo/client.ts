import ApolloClient from 'apollo-boost';

const uri = 'http://localhost:3000/graphql';

export const client = new ApolloClient({
  uri,
});
