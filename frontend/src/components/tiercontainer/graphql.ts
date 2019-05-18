import gql from 'graphql-tag';

export const DELETE_TIER = gql`
  mutation deleteTierMutation($tierUuid: String!) {
    deleteTier(id: $tierUuid) {
      uuid
    }
  }
`;
