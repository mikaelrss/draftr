import React from 'react';

import PlayerName from '../positioncontainer/PlayerName';
import { rankings_personalRankings_players } from '../rankings/__generated__/rankings';

interface IProps {
  player: rankings_personalRankings_players;
}

const PlayerInfo = ({ player }: IProps) => {
  // const { data, loading } = useQuery(GET_PLAYERS);
  // if (loading) return <Loader />;

  return (
    <div>
      <PlayerName player={player} />
    </div>
  );
};

export default PlayerInfo;
