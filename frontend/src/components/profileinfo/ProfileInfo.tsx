import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import AuthContext from '../../auth/AuthContext';
import { IIdTokenPayload } from '../../auth/Auth';
import { DEFAULT_PADDING, MOBILE_BREAKPOINT } from '../../styles/constants';
import { PrimaryButton } from '../shared/Button';

const IMAGE_SIZE = 40;
const MOBILE_IMAGE_SIZE = 30;

const styles = StyleSheet.create({
  info: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.7em',
  },
  picture: {
    width: `${IMAGE_SIZE}px`,
    height: `${IMAGE_SIZE}px`,
    borderRadius: '50%',
    marginRight: `${DEFAULT_PADDING / 2}px`,
    [MOBILE_BREAKPOINT]: {
      width: `${MOBILE_IMAGE_SIZE}px`,
      height: `${MOBILE_IMAGE_SIZE}px`,
    },
  },
  name: {
    [MOBILE_BREAKPOINT]: {
      display: 'none',
    },
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
      <div className={css(styles.name)}>{idTokenPayload.given_name}</div>
      <PrimaryButton
        onClick={auth.logout}
        className={css(styles.logout)}
        value="Logout"
      />
    </div>
  );
};

export default ProfileInfo;
