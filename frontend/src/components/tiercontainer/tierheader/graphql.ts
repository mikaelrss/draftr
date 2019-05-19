import gql from 'graphql-tag';

export const DELETE_TIER = gql`
  mutation deleteTierMutation($tierUuid: String!) {
    deleteTier(id: $tierUuid) {
      uuid
    }
  }
`;

export const RENAME_TIER = gql`
  mutation RenameTierMutation($tierUuid: String!, $name: String!) {
    updateTierName(tierUuid: $tierUuid, name: $name) {
      uuid
    }
  }
`;
