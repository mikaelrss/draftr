/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeRankName
// ====================================================

export interface ChangeRankName_updateRankName {
  __typename: "Rank";
  uuid: string;
}

export interface ChangeRankName {
  updateRankName: ChangeRankName_updateRankName | null;
}

export interface ChangeRankNameVariables {
  uuid: string;
  name: string;
}
