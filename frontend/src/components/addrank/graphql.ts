import gql from 'graphql-tag';

export const ADD_RANK = gql`
  mutation AddRankMutation($name: String!) {
    createRank(name: $name) {
      uuid
      name
    }
  }
`;
