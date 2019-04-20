import React, { useContext } from 'react';
import { StyleSheet, css } from 'aphrodite';

import AuthContext from '../../auth/AuthContext';
import { IIdTokenPayload } from '../../auth/Auth';
import { DEFAULT_PADDING } from '../../styles/paddings';

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
});

const ProfileInfo = () => {
  const auth = useContext(AuthContext);
  if (!auth.idTokenPayload) return null;
  const idTokenPayload: IIdTokenPayload = auth.idTokenPayload;
  console.log(idTokenPayload);
  return (
    <div className={css(styles.info)}>
      <img src={idTokenPayload.picture} className={css(styles.picture)} />
      <div>{idTokenPayload.name}</div>
    </div>
  );
};

export default ProfileInfo;
