/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL query operation: rankings
// ====================================================

export interface rankings_rank_tiers_players {
  __typename: "RankedPlayer";
  playerId: number;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number | null;
  team: NFLTeam;
}

export interface rankings_rank_tiers {
  __typename: "Tier";
  tierId: number;
  name: string | null;
  uuid: string;
  players: rankings_rank_tiers_players[];
}

export interface rankings_rank {
  __typename: "Rank";
  name: string | null;
  uuid: string;
  tiers: rankings_rank_tiers[];
}

export interface rankings {
  rank: rankings_rank | null;
}

export interface rankingsVariables {
  id: string;
}
