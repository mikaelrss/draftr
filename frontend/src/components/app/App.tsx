import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo-hooks';
import 'typeface-roboto';

import './app.scss';
import { client } from '../../apollo/client';
import Root from '../root/Root';
import store from '../../redux/store';

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </Provider>
);
export default App;
