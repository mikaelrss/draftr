/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllRanks
// ====================================================

export interface AllRanks_ranks {
  __typename: "Rank";
  uuid: string;
  name: string;
  userOwnsRank: boolean | null;
  rating: number;
}

export interface AllRanks {
  ranks: AllRanks_ranks[];
}
