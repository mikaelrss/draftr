import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { GET_PLAYERS } from './graphql';
import PositionContainer from '../positioncontainer/PositionContainer';
import Loader from '../shared/Loader';

const Players = () => {
  const { data, loading } = useQuery(GET_PLAYERS);
  if (loading) return <Loader />;

  return (
    <div>
      <h2>Players</h2>
      <PositionContainer position="QB" players={data.players} />
    </div>
  );
};

export default Players;
