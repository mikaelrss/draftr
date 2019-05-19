import React, { useContext, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import { css, StyleSheet } from 'aphrodite/no-important';

import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';
import { DEFAULT_PADDING, MOBILE_BREAKPOINT } from '../../styles/constants';
import { Button, ClickableSurface } from '../shared/Button';
import AuthContext from '../../auth/AuthContext';
import ProfileInfo from '../profileinfo/ProfileInfo';
import Icon, { IconType } from '../shared/Icon';
import Link from '../shared/Link';
import ProfileMenu from '../profilemenu/ProfileMenu';

const ICON_SIZE = 40;
export const HEADER_HEIGHT = 64;

const styles = StyleSheet.create({
  header: {
    width: `calc(100% - ${DEFAULT_PADDING * 2})`,
    height: `${HEADER_HEIGHT}px`,
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
  click: {
    display: 'flex',
    width: 'auto !important',
  },
});

const AppHeader = () => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header className={css(styles.header)}>
      <Link to="/" className={css(styles.titleContainer)}>
        <Icon icon={IconType.draftr} className={css(styles.icon)} />
        <div>Draftr</div>
      </Link>
      {!auth.isAuthenticated() && <Button onClick={auth.login} value="Login" />}
      {auth.isAuthenticated() && (
        <Popup
          open={open}
          on="click"
          content={<ProfileMenu />}
          trigger={
            <ClickableSurface className={css(styles.click)}>
              <ProfileInfo />
            </ClickableSurface>
          }
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          position="bottom center"
        />
      )}
    </header>
  );
};

export default AppHeader;
