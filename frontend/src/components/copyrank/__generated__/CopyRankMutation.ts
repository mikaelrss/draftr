/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CopyRankMutation
// ====================================================

export interface CopyRankMutation_copyRank {
  __typename: "Rank";
  uuid: string;
}

export interface CopyRankMutation {
  copyRank: CopyRankMutation_copyRank | null;
}

export interface CopyRankMutationVariables {
  rankUuid: string;
  name: string;
}
