import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ReactComponent as Add } from '../../svg/add.svg';

const styles = StyleSheet.create({
  paper: {
    minHeight: '300px',
    backgroundColor: 'rgba(255,100,100,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `3px dotted ${SECONDARY}`,
    transition: 'opacity 150ms ease-in-out',
    opacity: 0.3,
    ':hover': {
      opacity: 1,
    },
  },
  icon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    fill: PRIMARY_TEXT,
    color: PRIMARY_TEXT,
    padding: 0,
    backgroundColor: PRIMARY,
    width: `${DEFAULT_PADDING * 2}px`,
    height: `${DEFAULT_PADDING * 2}px`,
    marginTop: `${DEFAULT_PADDING}px`,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import Paper from '../shared/Paper';
import { ClickableSurface } from '../shared/Button';
import { PRIMARY, PRIMARY_TEXT, SECONDARY } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';

const AddTier = () => {
  return (
    <ClickableSurface
      onClick={() => {
        console.log('TET');
      }}
    >
      New Tier
      <Paper className={css(styles.paper)}>
        <div>Add a tier</div>
        <Add className={css(styles.icon)} />
      </Paper>
    </ClickableSurface>
  );
};

export default AddTier;
