import gql from 'graphql-tag';

export const DELETE_RANK = gql`
  mutation DeleteRankMutation($uuid: String!) {
    deleteRank(id: $uuid)
  }
`;
