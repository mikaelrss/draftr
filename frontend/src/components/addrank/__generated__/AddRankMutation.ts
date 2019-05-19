/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRankMutation
// ====================================================

export interface AddRankMutation_createRank {
  __typename: "Rank";
  uuid: string;
  rating: number;
  name: string | null;
}

export interface AddRankMutation {
  createRank: AddRankMutation_createRank | null;
}

export interface AddRankMutationVariables {
  name: string;
}
