import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { StyleSheet, css } from 'aphrodite';

import { GET_FANTASY_FOOTBALL_RANKINGS } from './graphql';
import Loader from '../shared/Loader';
import TierContainer from '../tiercontainer/TierContainer';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { QB_COLOR, RB_COLOR, TE_COLOR, WR_COLOR } from '../../styles/colors';
import { rankings } from './__generated__/rankings';
import { PlayerPosition } from '../../types/graphqltypes';
import AddTier from '../addtier/AddTier';

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
  if (loading || !data) return <Loader />;

  return (
    <div className={css(styles.box)}>
      {data.personalRankings.map(tier => (
        <TierContainer
          tierId={tier.tierId}
          players={tier.players}
          key={`TIER_${tier.tierId}`}
        />
      ))}
      <AddTier />
      {/*<PositionContainer position="RB" players={positional.RB} className={css(getBackground('RB'))}/>*/}
      {/*<PositionContainer position="WR" players={positional.WR} className={css(getBackground('WR'))}/>*/}
      {/*<PositionContainer position="QB" players={positional.QB} className={css(getBackground('QB'))}/>*/}
    </div>
  );
};

export default Rankings;
