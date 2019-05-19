/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addTier
// ====================================================

export interface addTier_createTier_players {
  __typename: "RankedPlayer";
  playerId: number;
}

export interface addTier_createTier {
  __typename: "Tier";
  uuid: string;
  name: string;
  tierId: number;
  players: addTier_createTier_players[];
}

export interface addTier {
  createTier: addTier_createTier;
}

export interface addTierVariables {
  rankUuid: string;
}
