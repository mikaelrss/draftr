/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeRank
// ====================================================

export interface changeRank_changeRank {
  __typename: "Tier";
  uuid: string;
  tierId: number;
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
