import React from 'react';
import { connect } from 'react-redux';

import { IPlayerRankingDTO } from '../rankings/graphql';
import Paper from '../shared/Paper';
import Player from './Player';
import selector from './selector';

interface IStateProps {
  passed: string[];
}

type IProps = {
  position: string;
  players: IPlayerRankingDTO[];
} & IStateProps;

const PositionContainer = ({ position, players, passed }: IProps) => {
  console.log('passed', passed);
  const isDisabled = (id: string) => passed.includes(id);
  return (
    <div>
      {position}
      <Paper>
        {players.map((player, index) => (
          <Player
            player={player}
            positionRank={index + 1}
            key={player.playerId}
            disabled={isDisabled(player.playerId)}
          />
        ))}
      </Paper>
    </div>
  );
};

const withRedux = connect<IStateProps>(selector);

export default withRedux(PositionContainer);
