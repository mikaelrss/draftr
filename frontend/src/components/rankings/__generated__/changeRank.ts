/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL mutation operation: changeRank
// ====================================================

export interface changeRank_changeRank_tiers_players {
  __typename: "RankedPlayer";
  playerId: number;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number | null;
  team: NFLTeam;
}

export interface changeRank_changeRank_tiers {
  __typename: "Tier";
  uuid: string;
  tierId: number;
  players: changeRank_changeRank_tiers_players[];
}

export interface changeRank_changeRank {
  __typename: "Rank";
  name: string | null;
  uuid: string;
  tiers: changeRank_changeRank_tiers[];
}

export interface changeRank {
  changeRank: changeRank_changeRank | null;
}

export interface changeRankVariables {
  playerId: number;
  rankUuid: string;
  destTier: number;
  destRank: number;
}
