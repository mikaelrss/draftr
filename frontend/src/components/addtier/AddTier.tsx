import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Droppable } from 'react-beautiful-dnd';
import { StyleSheet, css } from 'aphrodite';

import { ReactComponent as Add } from '../../svg/add.svg';
import Paper from '../shared/Paper';
import { ClickableSurface } from '../shared/Button';
import { PRIMARY, PRIMARY_TEXT, SECONDARY } from '../../styles/colors';
import { DEFAULT_PADDING } from '../../styles/constants';
import { ADD_TIER_MUTATION } from './graphql';
import { GET_FANTASY_FOOTBALL_RANKINGS } from '../rankings/graphql';
import Spinner from '../shared/Spinner';

export const ADD_TIER_DROPPABLE_ID = 'addNewTier';

const styles = StyleSheet.create({
  paper: {
    minHeight: '300px',
    backgroundColor: 'rgba(255,100,100,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `3px dashed ${SECONDARY}`,
  },
  container: {
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
  const [loading, setLoading] = useState(false);
  const createTier = useMutation(ADD_TIER_MUTATION, {
    update: (proxy, mutationResult) => {
      const data = proxy.readQuery({ query: GET_FANTASY_FOOTBALL_RANKINGS });
      // @ts-ignore
      data.tiers.push({
        ...mutationResult.data.createTier.slice(-1)[0],
        players: [],
      });
      proxy.writeQuery({ query: GET_FANTASY_FOOTBALL_RANKINGS, data });
    },
  });
  return (
    <Droppable droppableId={ADD_TIER_DROPPABLE_ID}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <ClickableSurface
            className={css(styles.container)}
            onClick={() => {
              setLoading(true);
              createTier()
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
            }}
          >
            New Tier
            <Paper className={css(styles.paper)}>
              <Spinner loading={loading} />
              {!loading && (
                <>
                  <div>Add a tier</div>
                  <Add className={css(styles.icon)} />
                </>
              )}
            </Paper>
          </ClickableSurface>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default AddTier;
