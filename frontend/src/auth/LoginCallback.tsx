import React from 'react';
import AuthContext from './AuthContext';
import Spinner from '../components/shared/Spinner';

const LoginCallback = () => {
  const auth = React.useContext(AuthContext);
  auth.handleAuthentication();
  return <Spinner />;
};

export default LoginCallback;
