import React from 'react';
import { graphql, ChildMutateProps } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { StyleSheet, css } from 'aphrodite';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { CHANGE_RANK, GET_FANTASY_FOOTBALL_RANKINGS } from './graphql';
import TierContainer from '../tiercontainer/TierContainer';
import { DEFAULT_PADDING } from '../../styles/constants';
import {
  DEF_COLOR,
  K_COLOR,
  QB_COLOR,
  RB_COLOR,
  TE_COLOR,
  WR_COLOR,
} from '../../styles/colors';
import { rankings } from './__generated__/rankings';
import { PlayerPosition } from '../../types/graphqltypes';
import AddTier from '../addtier/AddTier';
import Spinner from '../shared/Spinner';
import { changeRank, changeRankVariables } from './__generated__/changeRank';
import { generateOptimisticRankChange } from './utils';

const styles = StyleSheet.create({
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 320px)',
    gridGap: `${DEFAULT_PADDING}px`,
    justifyContent: 'center',
  },
  rb: { backgroundColor: `${RB_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  wr: { backgroundColor: `${WR_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  te: { backgroundColor: `${TE_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  qb: { backgroundColor: `${QB_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  def: { backgroundColor: `${DEF_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  k: { backgroundColor: `${K_COLOR}90`, paddingTop: 0, paddingBottom: 0 },
  centered: {
    width: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export const getBackground = (position: PlayerPosition) => {
  const { QB, RB, TE, WR, DEF, K } = PlayerPosition;
  switch (position) {
    case QB:
      return styles.qb;
    case RB:
      return styles.rb;
    case TE:
      return styles.te;
    case WR:
      return styles.wr;
    case DEF:
      return styles.def;
    case K:
      return styles.k;
  }
};

type ChildProps = ChildMutateProps<{}, changeRank, changeRankVariables>;
type IProps = ChildProps;

const Rankings = ({ mutate }: IProps) => {
  const { data, loading } = useQuery<rankings>(GET_FANTASY_FOOTBALL_RANKINGS);
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

    const playerId = result.draggableId;

    const origTier = +result.source.droppableId.replace('tier#', '');
    const destTier = +result.destination.droppableId.replace('tier#', '');
    const destRank = +result.destination.index + 1;

    const optimisticResponse = generateOptimisticRankChange(
      {
        playerId,
        originTier: origTier,
        destinationTier: destTier,
        destinationRank: destRank,
      },
      data,
    );

    mutate({
      variables: {
        playerId,
        origTier,
        destTier,
        destRank,
      },
      optimisticResponse: {
        changeRank: optimisticResponse,
      },
    });
  };

  return (
    <div className={css(styles.box)}>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.tiers.map(tier => (
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

const withApollo = graphql<{}, changeRank, changeRankVariables, ChildProps>(
  CHANGE_RANK,
);

export default withApollo(Rankings);
