/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RenameTierMutation
// ====================================================

export interface RenameTierMutation_updateTierName {
  __typename: "Tier";
  uuid: string;
}

export interface RenameTierMutation {
  updateTierName: RenameTierMutation_updateTierName | null;
}

export interface RenameTierMutationVariables {
  tierUuid: string;
  name: string;
}
