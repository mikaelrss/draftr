/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: players
// ====================================================

export interface players_players {
  __typename: "Player";
  playerId: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  firstName: string | null;
  displayName: string | null;
  height: string | null;
  weight: string | null;
  position: string | null;
  team: string | null;
  jersey: string | null;
}

export interface players {
  players: players_players[];
}
