import React from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_RANK } from './graphql';
import Rankings from './Rankings';

const RankingsContainer = () => (
  <>
    <Mutation mutation={CHANGE_RANK}>
      {changeRank => <Rankings changeRankMutation={changeRank} />}
    </Mutation>
  </>
);

export default RankingsContainer;
