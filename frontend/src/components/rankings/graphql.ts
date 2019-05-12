import gql from 'graphql-tag';

export const GET_FANTASY_FOOTBALL_RANKINGS = gql`
  query rankings($id: String!) {
    rank(id: $id) {
      name
      uuid
      tiers {
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
  }
`;

export const NEW_TIER_CHANGE_RANK = gql`
  mutation newTierChangeRank($playerId: String!, $originTier: Int!) {
    createTierAndMovePlayers(originTier: $originTier, playerId: $playerId) {
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
