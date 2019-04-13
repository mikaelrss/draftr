/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: rankings
// ====================================================

export interface rankings_fantasyFootballNerdRankings {
  __typename: "RankedPlayer";
  displayName: string | null;
  position: string | null;
  playerId: string | null;
  team: string | null;
  overallRank: number | null;
  positionRank: number | null;
}

export interface rankings {
  fantasyFootballNerdRankings: rankings_fantasyFootballNerdRankings[];
}
