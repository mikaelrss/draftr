import ApolloClient from 'apollo-boost';

const uri = 'http://localhost:3000';

export const client = new ApolloClient({
  uri,
});
