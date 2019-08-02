import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ApolloProvider as BetaApolloHooksProvider } from '@apollo/react-hooks';
import ReactGA from 'react-ga';

import './app.scss';
import { client } from '../../apollo/client';
import Root, { history } from '../root/Root';
import createStore from '../../redux/store';
import { auth, AuthProvider } from '../../auth/AuthContext';

ReactGA.initialize('UA-142151658-1', {
  gaOptions: { siteSpeedSampleRate: 100 },
});

const { store, persistor } = createStore();

history.listen(location => {
  ReactGA.pageview(location.pathname + location.search);
});

export const sendGaEvent = (
  category: string,
  action: string,
  label?: string,
) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <BetaApolloHooksProvider client={client}>
            <AuthProvider value={auth}>
              <Router history={history}>
                <Root />
              </Router>
            </AuthProvider>
          </BetaApolloHooksProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
export default App;
