/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL mutation operation: changeRank
// ====================================================

export interface changeRank_changeRank_players {
  __typename: "RankedPlayer";
  playerId: string;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number | null;
  team: NFLTeam;
}

export interface changeRank_changeRank {
  __typename: "Tier";
  uuid: string;
  tierId: number;
  players: changeRank_changeRank_players[];
}

export interface changeRank {
  changeRank: changeRank_changeRank[];
}

export interface changeRankVariables {
  playerId: string;
  destTier: number;
  destRank: number;
  origTier: number;
}
