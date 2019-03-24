import gql from 'graphql-tag';
import { INFLTeam } from '../../svg/nfllogos/TeamLogo';

export interface IPlayerRankingDTO {
  playerId: string;
  displayName: string;
  position: string;
  team: INFLTeam;
}

export const GET_FANTASY_FOOTBALL_RANKINGS = gql`
  query {
    fantasyFootballNerdRankings {
      displayName
      position
      playerId
      team
    }
  }
`;
