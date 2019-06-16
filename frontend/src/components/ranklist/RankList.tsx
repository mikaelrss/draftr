import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Query } from 'react-apollo';
import { ALL_RANKS_QUERY } from './graphql';
import { AllRanks } from './__generated__/AllRanks';
import Spinner from '../shared/Spinner';
import Rank from '../rank/Rank';

import { StyleSheet, css } from 'aphrodite/no-important';
import Container from '../shared/Container';
import AddRank from '../addrank/AddRank';
import { DEFAULT_PADDING } from '../../styles/constants';
import AuthContext from '../../auth/AuthContext';

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

const RankList = ({ match }: RouteComponentProps) => {
  const auth = useContext(AuthContext);
  return (
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
              <div className={css(styles.loading)}>
                Could not find any ranks
              </div>
            );
          }

          const byRating = data.ranks.sort((a, b) => b.rating - a.rating);
          const myRanks = match.path === '/my-ranks/';

          return (
            <div className={css(styles.container)}>
              {byRating
                .filter(r => (myRanks ? r.userOwnsRank : true))
                .map(rank => (
                  <Rank rank={rank} key={rank.uuid} />
                ))}
            </div>
          );
        }}
      </Query>
      {auth.isAuthenticated() && <AddRank />}
    </Container>
  );
};

export default withRouter(RankList);
