import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

import AuthContext from '../../auth/AuthContext';
import Team from '../team/Team';
import Container from '../shared/Container';
import RankingsContainer from '../rankings/RankingsContainer';
import RankList from '../ranklist/RankList';

const Main = () => {
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated()) {
    return (
      <StickyContainer>
        <Route path="/rank/:id" component={Team} />
        <Container>
          <Route path="/rank/:id" component={RankingsContainer} />
          <Route path="/" exact component={RankList} />
          <Route path="/my-ranks/" component={RankList} />
        </Container>
      </StickyContainer>
    );
  }
  return (
    <Container>
      Please login to see players and rank them according to your own
      preferences
    </Container>
  );
};

export default Main;
