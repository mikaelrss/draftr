/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetRankMutation
// ====================================================

export interface SetRankMutation_setRankPrivate {
  __typename: "Rank";
  uuid: string;
  private: boolean;
}

export interface SetRankMutation {
  setRankPrivate: SetRankMutation_setRankPrivate | null;
}

export interface SetRankMutationVariables {
  uuid: string;
  status: boolean;
}
