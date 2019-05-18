import gql from 'graphql-tag';

export const ADD_RATING_MUTATION = gql`
  mutation AddRatingMutation($rankUuid: String!, $rating: Int!) {
    rateRank(rankUuid: $rankUuid, rating: $rating) {
      uuid
      rating
    }
  }
`;
