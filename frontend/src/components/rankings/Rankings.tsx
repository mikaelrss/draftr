import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import groupBy from 'lodash.groupby';

import { GET_FANTASY_FOOTBALL_RANKINGS, IPlayerRankingDTO } from './graphql';
import Loader from '../shared/Loader';
import PositionContainer from '../positioncontainer/PositionContainer';

interface IData {
  fantasyFootballNerdRankings: IPlayerRankingDTO[];
}

const Rankings = () => {
  const { data, loading } = useQuery<IData>(GET_FANTASY_FOOTBALL_RANKINGS);
  if (loading || !data) return <Loader />;

  const positional = groupBy(data.fantasyFootballNerdRankings, 'position');
  return (
    <div>
      <div>
        RB
        <PositionContainer position="RB" players={positional.RB} />
      </div>
      <div>
        RB
        <PositionContainer position="WR" players={positional.WR} />
      </div>
      <div>
        RB
        <PositionContainer position="QB" players={positional.QB} />
      </div>
      <div>
        RB
        <PositionContainer position="TE" players={positional.TE} />
      </div>
    </div>
  );
};

export default Rankings;
