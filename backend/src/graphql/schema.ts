import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    players: [Player!]!
  }

  type Player {
    playerId: String
    active: Boolean
    lastName: String
    firstName: String
    displayName: String
    team: String
    position: String
    height: String
    weight: String
    dateOfBirth: String
    college: String
    jersey: String
  }
`;
