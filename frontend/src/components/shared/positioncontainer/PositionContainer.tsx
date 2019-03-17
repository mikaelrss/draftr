import React from 'react';
import { Header, Card } from 'semantic-ui-react';

import { IPlayerQueryDTO } from '../../players/graphql';

interface IProps {
  position: string;
  players: IPlayerQueryDTO[];
}

const Player = ({ player }: { player: IPlayerQueryDTO }) => (
  <Card>
    <Card.Content>
      <Card.Header>{player.displayName}</Card.Header>
      <Card.Meta>Description</Card.Meta>
      <Card.Description>
        Team: {player.team}
        Height: {player.height}
        Weight: {player.weight}
        #: {player.jersey}
        id: {player.playerId}
      </Card.Description>
    </Card.Content>
  </Card>
);

const PositionContainer = ({ position, players }: IProps) => {
  return (
    <>
      <Header as="h2">{position}</Header>
      <Card.Group centered>
        {players.map(player => (
          <Player player={player} />
        ))}
      </Card.Group>
    </>
  );
};

export default PositionContainer;
