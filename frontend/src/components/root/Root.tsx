import React from 'react';
import { ToastContainer } from 'react-toastify';
import { StyleSheet, css } from 'aphrodite/no-important';
import 'react-toastify/dist/ReactToastify.css';

import AppHeader from '../appheader/AppHeader';
import Container from '../shared/Container';
import Rankings from '../rankings/Rankings';
import Team from '../team/Team';
import { SECONDARY } from '../../styles/colors';

const style = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  toastError: {
    backgroundColor: SECONDARY,
  },
});

const Root = () => (
  <>
    <div className={css(style.root)}>
      <AppHeader />
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        toastClassName={css(style.toastError)}
        autoClose={3000}
      />
      <Container>
        <Team />
        <Rankings />
      </Container>
    </div>
  </>
);

export default Root;
