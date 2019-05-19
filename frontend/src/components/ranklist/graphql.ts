import gql from 'graphql-tag';

export const ALL_RANKS_QUERY = gql`
  query AllRanks {
    ranks {
      uuid
      name
      private
      userOwnsRank
      rating
    }
  }
`;
