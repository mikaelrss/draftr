import gql from 'graphql-tag';

export const ADD_TIER_MUTATION = gql`
  mutation addTier($rankUuid: String!) {
    createTier(id: $rankUuid) {
      uuid
      tierId
    }
  }
`;
