import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import './app.scss';
import { client } from '../../apollo/client';
import Root from '../root/Root';
import store from '../../redux/store';
import { auth, AuthProvider } from '../../auth/AuthContext';

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AuthProvider value={auth}>
          <Root />
        </AuthProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  </Provider>
);
export default App;
