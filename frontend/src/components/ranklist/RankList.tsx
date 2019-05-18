import React from 'react';
import { Query } from 'react-apollo';
import { ALL_RANKS_QUERY } from './graphql';
import { AllRanks } from './__generated__/AllRanks';
import Spinner from '../shared/Spinner';
import Rank from '../rank/Rank';

import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const RankList = () => {
  return (
    <Query<AllRanks, {}> query={ALL_RANKS_QUERY}>
      {({ loading, data }) => {
        if (loading) return <Spinner />;
        if (!data) return <div>Could not find any ranks</div>;

        return (
          <div className={css(styles.container)}>
            {data.ranks.map(rank => (
              <Rank rank={rank} key={rank.uuid} />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default RankList;
