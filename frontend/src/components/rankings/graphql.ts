import gql from 'graphql-tag';

export const GET_FANTASY_FOOTBALL_RANKINGS = gql`
  query rankings {
    personalRankings {
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
