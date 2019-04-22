import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { toast } from 'react-toastify';
import { auth } from '../auth/AuthContext';

const cache = new InMemoryCache({
  dataIdFromObject: (obj: any) => obj.uuid,
});

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://draftr-api.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql';

export const client = new ApolloClient({
  uri,
  cache,
  headers: {
    authorization: `Bearer ${auth.getAccessToken()}`,
  },
  onError: error => {
    if (error.networkError) {
      toast.error(error.networkError.message);
    }
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((err: any) => toast.error(err.message));
    }
  },
  fetchOptions: {
    credentials: 'include',
  },
});
