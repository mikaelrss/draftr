import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import AuthContext from '../../auth/AuthContext';
import { IIdTokenPayload } from '../../auth/Auth';
import { DEFAULT_PADDING } from '../../styles/constants';
import { Button } from '../shared/Button';

const styles = StyleSheet.create({
  info: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7em',
  },
  picture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: `${DEFAULT_PADDING / 2}px`,
  },
  logout: {
    marginLeft: `${DEFAULT_PADDING / 2}px`,
  },
});

const ProfileInfo = () => {
  const auth = useContext(AuthContext);
  if (!auth.idTokenPayload) return null;
  const idTokenPayload: IIdTokenPayload = auth.idTokenPayload;
  return (
    <div className={css(styles.info)}>
      <img src={idTokenPayload.picture} className={css(styles.picture)} />
      <div>{idTokenPayload.given_name}</div>
      <Button
        onClick={auth.logout}
        className={css(styles.logout)}
        value="Logout"
      />
    </div>
  );
};

export default ProfileInfo;
