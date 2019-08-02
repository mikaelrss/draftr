import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

import { toast } from 'react-toastify';
import { auth } from '../auth/AuthContext';

const cache = new InMemoryCache({
  dataIdFromObject: (obj: any) => obj.uuid,
});

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://draftr-api.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql';

const request = async (operation: any) => {
  const token = `Bearer ${auth.getAccessToken()}`;
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          // @ts-ignore
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    }),
);

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(error => {
      if (error.networkError) {
        toast.error(error.networkError.message);
      }
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err: any) => toast.error(err.message));
      }
    }),
    requestLink,
    createUploadLink({ uri, credentials: 'include' }),
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: value => {
      // @ts-ignore
      if (value.__typename === 'RankedPlayer') return value.playerId;
      // @ts-ignore
      return value.uuid;
    },
  }),
});

// ***export const client = new ApolloClient({
//   uri,
//   cache,
//   headers: {
//     authorization: `Bearer ${auth.getAccessToken()}`,
//   },
// });
