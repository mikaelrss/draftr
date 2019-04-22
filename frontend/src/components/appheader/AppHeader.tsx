import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { Button } from '../shared/Button';
import AuthContext from '../../auth/AuthContext';
import ProfileInfo from '../profileinfo/ProfileInfo';

const style = StyleSheet.create({
  header: {
    width: `calc(100% - ${DEFAULT_PADDING * 2})`,
    height: '64px',
    backgroundColor: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${DEFAULT_PADDING}px`,
    color: PRIMARY_TEXT,
    justifyContent: 'space-between',
  },
});

const AppHeader = () => {
  const auth = useContext(AuthContext);
  return (
    <header className={css(style.header)}>
      <div>Draftr</div>
      {!auth.isAuthenticated() && <Button onClick={auth.login} value="Login" />}
      {auth.isAuthenticated() && <ProfileInfo />}
    </header>
  );
};

export default AppHeader;
