import gql from 'graphql-tag';

export const SET_POSITION_RANKING = gql`
  mutation positionRank(
    $playerId: String!
    $positionRank: Float!
    $fromPositionRank: Float!
  ) {
    setPlayerPositionRank(
      playerId: $playerId
      positionRank: $positionRank
      fromPositionRank: $fromPositionRank
    ) {
      playerId
      displayName
      positionRank
    }
  }
`;
