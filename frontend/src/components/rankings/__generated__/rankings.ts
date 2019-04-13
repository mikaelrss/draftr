/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PlayerPosition, NFLTeam } from "./../../../types/graphqltypes";

// ====================================================
// GraphQL query operation: rankings
// ====================================================

export interface rankings_personalRankings_players {
  __typename: "RankedPlayer";
  playerId: string;
  displayName: string;
  position: PlayerPosition;
  overallRank: number;
  positionRank: number;
  team: NFLTeam;
}

export interface rankings_personalRankings {
  __typename: "Tier";
  uuid: string;
  tierId: number;
  players: rankings_personalRankings_players[];
}

export interface rankings {
  personalRankings: rankings_personalRankings[];
}
