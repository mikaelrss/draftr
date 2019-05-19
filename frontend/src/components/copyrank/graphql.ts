import gql from 'graphql-tag';

export const COPY_RANK = gql`
  mutation CopyRankMutation($rankUuid: String!, $name: String!) {
    copyRank(name: $name, rankUuid: $rankUuid) {
      uuid
    }
  }
`;
