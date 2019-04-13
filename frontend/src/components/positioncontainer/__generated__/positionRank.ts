/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: positionRank
// ====================================================

export interface positionRank_setPlayerPositionRank {
  __typename: "RankedPlayer";
  playerId: string | null;
  displayName: string | null;
  positionRank: number | null;
}

export interface positionRank {
  setPlayerPositionRank: positionRank_setPlayerPositionRank[];
}

export interface positionRankVariables {
  playerId: string;
  positionRank: number;
  fromPositionRank: number;
}
