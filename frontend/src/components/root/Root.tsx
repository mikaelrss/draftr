import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { StyleSheet, css } from 'aphrodite/no-important';
import { StickyContainer } from 'react-sticky';
import 'react-toastify/dist/ReactToastify.css';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/Container';
import Team from '../team/Team';
import { SECONDARY } from '../../styles/colors';
import LoginCallback from '../../auth/LoginCallback';
import AuthContext from '../../auth/AuthContext';
import RankingsContainer from '../rankings/RankingsContainer';
import RankList from '../ranklist/RankList';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toastError: {
    backgroundColor: SECONDARY,
  },
});

export const history = createBrowserHistory();

const Main = () => {
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated()) {
    return (
      <StickyContainer>
        <Route path="/rank/:id" component={Team} />
        <Container>
          <Route path="/rank/:id" component={RankingsContainer} />
          <Route path="/ranks/" component={RankList} />
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

const Root = () => (
  <div className={css(styles.root)}>
    <AppHeader />
    <ToastContainer
      position="bottom-center"
      hideProgressBar
      toastClassName={css(styles.toastError)}
      autoClose={3000}
    />
    <Route path="/" component={Main} />
    <Route path="/callback" component={LoginCallback} />
  </div>
);

export default Root;
