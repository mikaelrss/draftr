import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import './app.scss';
import { client } from '../../apollo/client';
import Root, { history } from '../root/Root';
import createStore from '../../redux/store';
import { auth, AuthProvider } from '../../auth/AuthContext';

const { store, persistor } = createStore();

history.listen(location => {
  // @ts-ignore
  window.ga('set', 'page', location.pathname + location.search);
  // @ts-ignore
  window.ga('send', 'pageview');
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AuthProvider value={auth}>
            <Router history={history}>
              <Root />
            </Router>
          </AuthProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
export default App;
