import React, { useContext } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';
import { DEFAULT_PADDING, MOBILE_BREAKPOINT } from '../../styles/constants';
import { Button } from '../shared/Button';
import AuthContext from '../../auth/AuthContext';
import ProfileInfo from '../profileinfo/ProfileInfo';
import Icon, { IconType } from '../shared/Icon';

const ICON_SIZE = 40;

const styles = StyleSheet.create({
  header: {
    width: `calc(100% - ${DEFAULT_PADDING * 2})`,
    height: '64px',
    backgroundColor: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${DEFAULT_PADDING}px`,
    color: PRIMARY_TEXT,
    justifyContent: 'space-between',
    [MOBILE_BREAKPOINT]: {
      fontSize: '0.7em',
    },
  },
  icon: {
    width: `${ICON_SIZE}px`,
    height: `${ICON_SIZE}px`,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    [MOBILE_BREAKPOINT]: {
      alignItems: 'center',
    },
  },
});

const AppHeader = () => {
  const auth = useContext(AuthContext);
  return (
    <header className={css(styles.header)}>
      <div className={css(styles.titleContainer)}>
        <Icon icon={IconType.draftr} className={css(styles.icon)} />
        <div>Draftr</div>
      </div>
      {!auth.isAuthenticated() && <Button onClick={auth.login} value="Login" />}
      {auth.isAuthenticated() && <ProfileInfo />}
    </header>
  );
};

export default AppHeader;
