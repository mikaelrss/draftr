import React from 'react';
import { Query } from 'react-apollo';
import { ALL_RANKS_QUERY } from './graphql';
import { AllRanks } from './__generated__/AllRanks';
import Spinner from '../shared/Spinner';
import Rank from '../rank/Rank';

import { StyleSheet, css } from 'aphrodite/no-important';
import Container from '../shared/Container';
import AddRank from '../addrank/AddRank';
import { DEFAULT_PADDING } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 170px)',
    gridGap: `${DEFAULT_PADDING}px`,
    justifyContent: 'center',
  },
  loading: {
    display: 'grid',
    justifyContent: 'center',
  },
});

const RankList = () => (
  <Container>
    <Query<AllRanks, {}> query={ALL_RANKS_QUERY}>
      {({ loading, data }) => {
        if (loading) {
          return (
            <div className={css(styles.loading)}>
              <Spinner />
            </div>
          );
        }
        if (!data) {
          return (
            <div className={css(styles.loading)}>Could not find any ranks</div>
          );
        }

        const byRating = data.ranks.sort((a, b) => b.rating - a.rating);

        return (
          <div className={css(styles.container)}>
            {byRating.map(rank => (
              <Rank rank={rank} key={rank.uuid} />
            ))}
          </div>
        );
      }}
    </Query>
    <AddRank />
  </Container>
);

export default RankList;
