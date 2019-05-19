import gql from 'graphql-tag';

export const SET_RANK_PRIVATE = gql`
  mutation SetRankMutation($uuid: String!, $status: Boolean!) {
    setRankPrivate(uuid: $uuid, status: $status) {
      uuid
      private
    }
  }
`;

export const CHANGE_RANK_NAME = gql`
  mutation ChangeRankName($uuid: String!, $name: String!) {
    updateRankName(rankUuid: $uuid, name: $name) {
      uuid
    }
  }
`;
