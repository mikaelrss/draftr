import React from 'react';
import AuthContext from './AuthContext';
import Spinner from '../components/shared/Spinner';

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  login: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const LoginCallback = () => {
  const auth = React.useContext(AuthContext);
  auth.handleAuthentication();
  return (
    <div className={css(styles.login)}>
      <div>Logging in...</div>
      <Spinner />
    </div>
  );
};

export default LoginCallback;
