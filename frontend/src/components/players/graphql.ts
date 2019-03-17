import gql from 'graphql-tag';

export interface IPlayerQueryDTO {
  playerId: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  displayName: string;
  height: string;
  weight: string;
  position: string;
  team: string;
  jersey: string;
}

export const GET_PLAYERS = gql`
  query players {
    players {
      playerId
      lastName
      dateOfBirth
      firstName
      displayName
      height
      weight
      position
      team
      jersey
    }
  }
`;
