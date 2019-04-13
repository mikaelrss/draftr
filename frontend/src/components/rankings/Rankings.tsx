import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import groupBy from 'lodash.groupby';
import { StyleSheet, css } from 'aphrodite';

import {
  GET_FANTASY_FOOTBALL_RANKINGS,
  IPlayerRankingDTO,
  IPosition,
} from './graphql';
import Loader from '../shared/Loader';
import PositionContainer from '../positioncontainer/PositionContainer';
import { DEFAULT_PADDING } from '../../styles/paddings';
import { QB_COLOR, RB_COLOR, TE_COLOR, WR_COLOR } from '../../styles/colors';

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

export const getBackground = (position: IPosition) => {
  switch (position) {
    case 'QB':
      return styles.qb;
    case 'RB':
      return styles.rb;
    case 'TE':
      return styles.te;
    case 'WR':
      return styles.wr;
  }
};

interface IData {
  fantasyFootballNerdRankings: IPlayerRankingDTO[];
}

const Rankings = () => {
  const { data, loading } = useQuery<IData>(GET_FANTASY_FOOTBALL_RANKINGS);
  if (loading || !data) return <Loader />;

  // const positional = groupBy(data.fantasyFootballNerdRankings, 'position');
  return (
    <div className={css(styles.box)}>
      {/*<PositionContainer position="RB" players={positional.RB} className={css(getBackground('RB'))}/>*/}
      {/*<PositionContainer position="WR" players={positional.WR} className={css(getBackground('WR'))}/>*/}
      {/*<PositionContainer position="QB" players={positional.QB} className={css(getBackground('QB'))}/>*/}
      <PositionContainer
        position="TE"
        players={data.fantasyFootballNerdRankings}
      />
    </div>
  );
};

export default Rankings;
