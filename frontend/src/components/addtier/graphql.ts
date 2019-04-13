import gql from 'graphql-tag';

export const ADD_TIER_MUTATION = gql`
  mutation addTier {
    createTier {
      uuid
      tierId
    }
  }
`;
