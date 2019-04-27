import React, { useContext } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { StyleSheet, css } from 'aphrodite/no-important';
import { StickyContainer } from 'react-sticky';
import 'react-toastify/dist/ReactToastify.css';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/Container';
import Rankings from '../rankings/Rankings';
import Team from '../team/Team';
import { SECONDARY } from '../../styles/colors';
import LoginCallback from '../../auth/LoginCallback';
import AuthContext from '../../auth/AuthContext';

const style = StyleSheet.create({
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
        <Team />
        <Container>
          <Rankings />
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
  <div className={css(style.root)}>
    <AppHeader />
    <ToastContainer
      position="bottom-center"
      hideProgressBar
      toastClassName={css(style.toastError)}
      autoClose={3000}
    />
    <Router history={history}>
      <Route path="/" component={Main} />
      <Route path="/callback" component={LoginCallback} />
    </Router>
  </div>
);

export default Root;
