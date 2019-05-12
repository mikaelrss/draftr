import React from 'react';

import PlayerName from '../tiercontainer/PlayerName';
import { rankings_rank_tiers_players } from '../rankings/__generated__/rankings';

interface IProps {
  player: rankings_rank_tiers_players;
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
