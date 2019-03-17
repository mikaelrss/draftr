import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';

import './app.scss';
import { client } from '../../apollo/client';
import Root from '../root/Root';

const App = () => (
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
);
export default App;
