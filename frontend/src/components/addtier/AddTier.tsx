import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { StyleSheet, css } from 'aphrodite';

import { ReactComponent as Add } from '../../svg/add.svg';
import Paper from '../shared/Paper';
import { ClickableSurface } from '../shared/Button';
import { PRIMARY, PRIMARY_TEXT, SECONDARY } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { ADD_TIER_MUTATION } from './graphql';
import { addTier, addTier_createTier } from './__generated__/addTier';
import { GET_FANTASY_FOOTBALL_RANKINGS } from '../rankings/graphql';

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

const AddTier = () => {
  const createTier = useMutation(ADD_TIER_MUTATION, {
    update: (proxy, mutationResult) => {
      const data = proxy.readQuery({ query: GET_FANTASY_FOOTBALL_RANKINGS });
      // @ts-ignore
      data.personalRankings.push({
        ...mutationResult.data.createTier.slice(-1)[0],
        players: [],
      });
      proxy.writeQuery({ query: GET_FANTASY_FOOTBALL_RANKINGS, data });
    },
  });
  return (
    <ClickableSurface onClick={createTier}>
      New Tier
      <Paper className={css(styles.paper)}>
        <div>Add a tier</div>
        <Add className={css(styles.icon)} />
      </Paper>
    </ClickableSurface>
  );
};

export default AddTier;
