import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MutationFn } from 'react-apollo';
import { useQuery } from 'react-apollo-hooks';
import { StyleSheet, css } from 'aphrodite';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { GET_FANTASY_FOOTBALL_RANKINGS } from './graphql';
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
import AddTier, { ADD_TIER_DROPPABLE_ID } from '../addtier/AddTier';
import Spinner from '../shared/Spinner';
import { changeRank, changeRankVariables } from './__generated__/changeRank';
import RateRank from '../raterank/RateRank';
import CopyRank from '../copyrank/CopyRank';
import RankHeader from './rankheader/RankHeader';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
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

type Props = {
  changeRankMutation: MutationFn<changeRank, changeRankVariables>;
  // createTierMutation: MutationFn<newTierChangeRank, newTierChangeRankVariables>;
} & RouteComponentProps<{ id: string }>;

const Rankings = ({ changeRankMutation, match }: Props) => {
  const rankUuid = match.params.id;
  const { data, loading } = useQuery<rankings>(GET_FANTASY_FOOTBALL_RANKINGS, {
    variables: { id: rankUuid },
  });
  if (loading || !data)
    return (
      <div className={css(styles.centered)}>
        <Spinner />
      </div>
    );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const origTier = +result.source.droppableId.replace('tier#', '');
    const playerId = result.draggableId;

    // if (result.destination.droppableId === ADD_TIER_DROPPABLE_ID) {
    //   createTierMutation({
    //     variables: {
    //       originTier: origTier,
    //       playerId,
    //     },
    //     update: (proxy, mutationResult) => {
    //       if (mutationResult.data == null) return;
    //       proxy.writeQuery({
    //         query: GET_FANTASY_FOOTBALL_RANKINGS,
    //         data: { tiers: mutationResult.data.createTierAndMovePlayers },
    //       });
    //     },
    //   });
    //   return;
    // }

    const destTier = +result.destination.droppableId.replace('tier#', '');
    const destRank = +result.destination.index + 1;

    // const optimisticResponse = generateOptimisticRankChange(
    //   {
    //     playerId,
    //     originTier: origTier,
    //     destinationTier: destTier,
    //     destinationRank: destRank,
    //   },
    //   data,
    // );

    changeRankMutation({
      variables: {
        playerId: +playerId,
        rankUuid,
        destTier,
        destRank,
      },
    });
  };
  if (data.rank == null) return null;
  const { userOwnsRank } = data.rank;
  return (
    <div className={css(styles.container)}>
      <RankHeader rank={data.rank} />
      <div className={css(styles.box)}>
        <DragDropContext onDragEnd={onDragEnd}>
          {data.rank.tiers.map(tier => (
            <TierContainer
              tier={tier}
              key={`TIER_${tier.tierId}`}
              dragDisabled={!userOwnsRank}
            />
          ))}
          {userOwnsRank && <AddTier />}
          <CopyRank rank={data.rank} />
        </DragDropContext>
        {!userOwnsRank && <RateRank rank={data.rank} />}
      </div>
    </div>
  );
};

export default withRouter(Rankings);
