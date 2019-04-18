import gql from 'graphql-tag';

export const GET_FANTASY_FOOTBALL_RANKINGS = gql`
  query rankings {
    tiers {
      uuid
      tierId
      players {
        playerId
        displayName
        position
        overallRank
        positionRank
        team
      }
    }
  }
`;

export const CHANGE_RANK = gql`
  mutation changeRank(
    $playerId: String!
    $destTier: Int!
    $destRank: Int!
    $origTier: Int!
  ) {
    changeRank(
      playerId: $playerId
      destinationRank: $destRank
      destinationTier: $destTier
      originTier: $origTier
    ) {
      uuid
      tierId
      players {
        playerId
        displayName
        position
        overallRank
        positionRank
        team
      }
    }
  }
`;
