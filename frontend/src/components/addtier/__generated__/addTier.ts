/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL mutation operation: addTier
// ====================================================

export interface addTier_createTier_players {
  __typename: "RankedPlayer";
  displayName: string;
  playerId: string;
  overallRank: number;
  team: NFLTeam;
  positionRank: number;
}

export interface addTier_createTier {
  __typename: "Tier";
  tierId: number;
  players: addTier_createTier_players[];
}

export interface addTier {
  createTier: addTier_createTier[];
}
