import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Loader, Header, Segment } from 'semantic-ui-react';

import { GET_PLAYERS } from './graphql';
import PositionContainer from '../shared/positioncontainer/PositionContainer';

const Players = () => {
  const { data, loading } = useQuery(GET_PLAYERS);
  if (loading) return <Loader active>Loading</Loader>;

  return (
    <Segment>
      <Header as="h2">Players</Header>
      <PositionContainer position="QB" players={data.players} />
    </Segment>
  );
};

export default Players;
