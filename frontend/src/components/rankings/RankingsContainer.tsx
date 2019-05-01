import React from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_RANK, NEW_TIER_CHANGE_RANK } from './graphql';
import Rankings from './Rankings';

const RankingsContainer = () => (
  <>
    <Mutation mutation={NEW_TIER_CHANGE_RANK}>
      {createTier => (
        <Mutation mutation={CHANGE_RANK}>
          {changeRank => (
            <Rankings
              changeRankMutation={changeRank}
              createTierMutation={createTier}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  </>
);

export default RankingsContainer;
