import React from 'react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { StyleSheet, css } from 'aphrodite';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { CHANGE_RANK, GET_FANTASY_FOOTBALL_RANKINGS } from './graphql';
import TierContainer from '../tiercontainer/TierContainer';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { QB_COLOR, RB_COLOR, TE_COLOR, WR_COLOR } from '../../styles/colors';
import { rankings } from './__generated__/rankings';
import { PlayerPosition } from '../../types/graphqltypes';
import AddTier from '../addtier/AddTier';
import Spinner from '../shared/Spinner';
import { changeRank, changeRankVariables } from './__generated__/changeRank';

const styles = StyleSheet.create({
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 320px)',
    gridGap: `${DEFAULT_PADDING}px`,
    justifyContent: 'center',
  },
  rb: { backgroundColor: `${RB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  wr: { backgroundColor: `${WR_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  te: { backgroundColor: `${TE_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  qb: { backgroundColor: `${QB_COLOR}44`, paddingTop: 0, paddingBottom: 0 },
  centered: {
    width: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export const getBackground = (position: PlayerPosition) => {
  const { QB, RB, TE, WR } = PlayerPosition;
  switch (position) {
    case QB:
      return styles.qb;
    case RB:
      return styles.rb;
    case TE:
      return styles.te;
    case WR:
      return styles.wr;
  }
};

const Rankings = () => {
  const { data, loading } = useQuery<rankings>(GET_FANTASY_FOOTBALL_RANKINGS);
  console.log('DATA update', data);
  const changeRankMutation = useMutation<changeRank, changeRankVariables>(
    CHANGE_RANK,
  );
  if (loading || !data)
    return (
      <div className={css(styles.centered)}>
        <Spinner />
      </div>
    );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    changeRankMutation({
      variables: {
        playerId: result.draggableId,
        origTier: +result.source.droppableId.replace('tier#', ''),
        destTier: +result.destination.droppableId.replace('tier#', ''),
        destRank: +result.destination.index + 1,
      },
    });
  };

  return (
    <div className={css(styles.box)}>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.personalRankings.map(tier => (
          <TierContainer
            tierId={tier.tierId}
            players={tier.players}
            key={`TIER_${tier.tierId}`}
          />
        ))}
      </DragDropContext>
      <AddTier />
    </div>
  );
};

export default Rankings;
