import React from 'react';
import { IPlayerRankingDTO } from '../rankings/graphql';
import TeamLogo from '../../svg/nfllogos/TeamLogo';
import Paper from '../shared/Paper';

interface IPlayerProps {
  player: IPlayerRankingDTO;
  positionRank: number;
}

const AddButton = () => <button>ADD</button>;
const DoneButton = () => <button>Done</button>;

const Player = ({ player, positionRank }: IPlayerProps) => (
  <div>
    <div>
      <TeamLogo team={player.team} />
      {player.displayName}
    </div>
    <div>{positionRank}</div>
    <div>
      <AddButton />
      <DoneButton />
    </div>
  </div>
);

interface IProps {
  position: string;
  players: IPlayerRankingDTO[];
}

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <Paper>
      {players.map((player, index) => (
        <Player player={player} positionRank={index + 1} />
      ))}
    </Paper>
  );
};

export default PositionContainer;
