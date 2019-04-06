import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { PRIMARY, PRIMARY_TEXT } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';

const style = StyleSheet.create({
  header: {
    width: '100%',
    height: '64px',
    backgroundColor: PRIMARY,
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${DEFAULT_PADDING}`,
    color: PRIMARY_TEXT,
  },
});

const AppHeader = () => <header className={css(style.header)}>Draftr</header>;

export default AppHeader;
