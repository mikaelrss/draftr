import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import groupBy from 'lodash.groupby';
import { StyleSheet, css } from 'aphrodite/no-important';

import { GET_FANTASY_FOOTBALL_RANKINGS, IPlayerRankingDTO } from './graphql';
import Loader from '../shared/Loader';
import PositionContainer from '../positioncontainer/PositionContainer';
import { DEFAULT_PADDING } from '../../styles/paddings';

const styles = StyleSheet.create({
  box: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 320px)',
    gridGap: `${DEFAULT_PADDING}px`,
    justifyContent: 'center',
  },
});

interface IData {
  fantasyFootballNerdRankings: IPlayerRankingDTO[];
}

const Rankings = () => {
  const { data, loading } = useQuery<IData>(GET_FANTASY_FOOTBALL_RANKINGS);
  if (loading || !data) return <Loader />;

  const positional = groupBy(data.fantasyFootballNerdRankings, 'position');
  return (
    <div className={css(styles.box)}>
      <PositionContainer position="RB" players={positional.RB} />
      <PositionContainer position="WR" players={positional.WR} />
      <PositionContainer position="QB" players={positional.QB} />
      <PositionContainer position="TE" players={positional.TE} />
    </div>
  );
};

export default Rankings;
