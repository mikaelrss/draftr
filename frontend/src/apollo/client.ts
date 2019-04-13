import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache({
  dataIdFromObject: (obj: any) => obj.uuid,
});

const uri = 'http://localhost:3000/graphql';

export const client = new ApolloClient({
  uri,
  cache,
});
