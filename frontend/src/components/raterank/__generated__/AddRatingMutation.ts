/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRatingMutation
// ====================================================

export interface AddRatingMutation_rateRank {
  __typename: "Rank";
  uuid: string;
  rating: number;
}

export interface AddRatingMutation {
  rateRank: AddRatingMutation_rateRank;
}

export interface AddRatingMutationVariables {
  rankUuid: string;
  rating: number;
}
