import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toast } from 'react-toastify';

const cache = new InMemoryCache({
  dataIdFromObject: (obj: any) => obj.uuid,
});

const uri = 'http://localhost:4000/graphql';

export const client = new ApolloClient({
  uri,
  cache,
  onError: error => {
    if (error.networkError) {
      toast.error(error.networkError.message);
    }
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((err: any) => toast.error(err.message));
    }
  },
});
