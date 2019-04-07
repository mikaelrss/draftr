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
  className?: string;
} & IStateProps;

const PositionContainer = ({
  position,
  players,
  passed,
  className,
}: IProps) => {
  const isDisabled = (id: string) => passed.includes(id);
  return (
    <div>
      {position}
      <Paper className={className}>
        {players.map(player => (
          <Player
            player={player}
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
