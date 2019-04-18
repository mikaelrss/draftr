/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL query operation: rankings
// ====================================================

export interface rankings_tiers_players {
  __typename: "RankedPlayer";
  playerId: string;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number;
  team: NFLTeam;
}

export interface rankings_tiers {
  __typename: "Tier";
  uuid: string;
  tierId: number;
  players: rankings_tiers_players[];
}

export interface rankings {
  tiers: rankings_tiers[];
}
