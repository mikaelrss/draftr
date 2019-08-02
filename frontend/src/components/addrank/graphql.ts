import gql from 'graphql-tag';

export const ADD_RANK = gql`
  mutation AddRankMutation($name: String!) {
    createRank(name: $name) {
      uuid
      private
      userOwnsRank
      rating
      name
    }
  }
`;

export const UPLOAD_RANK = gql`
  mutation UploadRankMutation($file: Upload!) {
    uploadRank(file: $file) {
      uuid
      private
      userOwnsRank
      rating
      name
    }
  }
`;
