import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { GET_PLAYERS } from './graphql';
import PositionContainer from '../positioncontainer/PositionContainer';
import Loader from '../shared/Loader';
import { IPlayerRankingDTO } from '../rankings/graphql';

interface IProps {
  player: IPlayerRankingDTO;
}

const PlayerInfo = ({ player }: IProps) => {
  // const { data, loading } = useQuery(GET_PLAYERS);
  // if (loading) return <Loader />;

  return (
    <div>
      <h4>{player.displayName}</h4>
      {/*<PositionContainer position="QB" players={data.players} />*/}
    </div>
  );
};

export default PlayerInfo;
