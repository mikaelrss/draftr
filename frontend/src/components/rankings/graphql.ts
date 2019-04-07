import gql from 'graphql-tag';
import { INFLTeam } from '../../svg/nfllogos/TeamLogo';

export type IPosition = 'RB' | 'WR' | 'QB' | 'TE';

export interface IPlayerRankingDTO {
  playerId: string;
  displayName: string;
  position: IPosition;
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
