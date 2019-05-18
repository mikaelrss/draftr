/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL mutation operation: newTierChangeRank
// ====================================================

export interface newTierChangeRank_createTierAndMovePlayers_players {
  __typename: "RankedPlayer";
  playerId: number;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number | null;
  team: NFLTeam;
}

export interface newTierChangeRank_createTierAndMovePlayers {
  __typename: "Tier";
  uuid: string;
  tierId: number;
  players: newTierChangeRank_createTierAndMovePlayers_players[];
}

export interface newTierChangeRank {
  createTierAndMovePlayers: newTierChangeRank_createTierAndMovePlayers[];
}

export interface newTierChangeRankVariables {
  playerId: string;
  originTier: number;
}
